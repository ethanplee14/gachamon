import {createProtectedRouter} from "./protected-router";
import {z} from "zod";
import {dayDiff} from "../../utils/date";
import {Gachamon, PrismaClient} from "@prisma/client";
import {randomPokemonNearestTo, rollStat} from "../pokemon/stat";
import {pokedex} from "../pokemon/pokedex";
import nameOutliers from "../../../res/name-outliers.json";
import {randomIntRange} from "../../utils/math";


const nameZod = z.string()
  .min(3, {message: "Must be 3 or more characters long"})
  .max(36, {message: "Must be less than 36 characters long"})

export const gachamonRouter = createProtectedRouter()
  .query("rolls-left", {
    async resolve({ ctx }) {
      const profile = await ctx.prisma.gachamon.findUniqueOrThrow({
        where: {userId: ctx.session.user.id},
        select: {lastRolled: true, rolls: true}
      })
      return await getRolls(profile)
    }
  })
  .mutation("roll", {
    async resolve({ ctx }) {
      const gachamon = await ctx.prisma.gachamon.findUniqueOrThrow({where: {userId: ctx.session.user.id}})
      const rolls = await getRolls(gachamon)
      if(rolls == 0)
        throw new Error("Lol you got fucked")

      const randomStat = rollStat()
      const pokemonStats = randomPokemonNearestTo(randomStat)

      const [pokemonData, species] = await Promise.all([
        //when looking up pokemon, needs the specific pokemon form. Species needs to be the general name.
        pokedex.getPokemonByName((nameOutliers as Record<string, string>)[pokemonStats.name] ?? pokemonStats.name),
        pokedex.getPokemonSpeciesByName(pokemonStats.name),
      ])
      const updatedGachamon = await ctx.prisma.gachamon.update({
        where: {id: gachamon.id},
        data: {
          lastRolled: new Date(),
          rolls: rolls - 1,
          pokemon: {
            create: {
              name: pokemonStats.name,
              pokemonId: pokemonData.id,
            }
          }
        },
        include: {pokemon: {select: {id: true}}}
      })

      const enFlavorTxts = species.flavor_text_entries.filter(txt => txt.language.name == "en")
      const randomFlavorTxt = enFlavorTxts[randomIntRange(0, enFlavorTxts.length)]!
      return {
        id: updatedGachamon.pokemon[updatedGachamon.pokemon.length-1]!.id,
        name: pokemonStats.name,
        sprite: pokemonData.sprites.front_default ?? "",
        flavorText: randomFlavorTxt.flavor_text
      }
    }
  })
  .mutation("check-name", {
    input: nameZod,
    async resolve({ ctx, input }) {
      const gachamonProfile = await ctx.prisma.gachamon.findUnique({
        where: {username: input}
      })
      if (gachamonProfile)
        throw new Error(JSON.stringify({message: "Name already exists"}))
      return true
    }
  })
  .mutation("create-profile", {
    input: nameZod,
    async resolve({ ctx, input }) {
      return await ctx.prisma.gachamon.create({
        data: {username: input, userId: ctx.session.user.id}
      })
    }
  })

async function getRolls(profile: {rolls: number, lastRolled: Date | null}) {
  if(profile.lastRolled && (dayDiff(profile.lastRolled, new Date()) > 0 && profile.rolls < 3))
    return 3
  return profile.rolls
}
