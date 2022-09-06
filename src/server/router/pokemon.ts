import {z} from "zod";
import {randomPokemonNearestTo, rollStat} from "../pokemon/stat";
import {pokedex} from "../pokemon/pokedex";
import {randomIntRange} from "../../utils/math";
import {createProtectedRouter} from "./protected-router";
import nameOutliers from "../../../res/name-outliers.json"


export const pokemonRouter = createProtectedRouter()
  .mutation("roll", {
    async resolve({ ctx }) {
      // const profile = await ctx.prisma.gachamon.findUniqueOrThrow({
      //   where: {userId: ctx.session.user.id},
      //   select: {rolls: true, lastRolled: true}
      // })
      // if (profile.lastRolled)
      //
      // const randomStat = rollStat()
      // const pokemonStats = randomPokemonNearestTo(randomStat)
      //
      // const [pokemonData, species, gachamon] = await Promise.all([
      //   //when looking up pokemon, needs the specific pokemon form. Species needs to be the general name.
      //   pokedex.getPokemonByName((nameOutliers as Record<string, string>)[pokemonStats.name] ?? pokemonStats.name),
      //   pokedex.getPokemonSpeciesByName(pokemonStats.name),
      //   ctx.prisma.gachamon.findUniqueOrThrow({where: {userId: ctx.session.user.id}})
      // ])
      // const enFlavorTxts = species.flavor_text_entries.filter(txt => txt.language.name == "en")
      // const randomFlavorTxt = enFlavorTxts[randomIntRange(0, enFlavorTxts.length)]!
      //
      // const pokemon = await ctx.prisma.pokemon.create({
      //   data: {
      //     name: pokemonData.name,
      //     pokemonId: pokemonData.id,
      //     ownerId: gachamon.id
      //   }
      // })
      // return {
      //   id: pokemon.id,
      //   name: pokemonData.name,
      //   sprite: pokemonData.sprites.front_default ?? "",
      //   flavorText: randomFlavorTxt.flavor_text
      // }
    }
  })
  .mutation("release", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.pokemon.delete({where: {id: input}})
    }
  })
  .mutation("nick", {
    input: z.object({
      id: z.string(),
      nick: z.string().max(36)
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.pokemon.update({
        where: { id: input.id },
        data: { nick: input.nick == "" ? null : input.nick }
      })
    }
  })
  .query("getAll", {
    async resolve({ ctx }) {
      const profilePokemon = await ctx.prisma.gachamon.findUniqueOrThrow({
        where: {userId: ctx.session.user.id},
        include: {pokemon: true}
      })
      return await Promise.all(profilePokemon.pokemon.map(async pokemon => {
        const pokemonData = await pokedex.getPokemonById(pokemon.pokemonId)
        if (!pokemonData.sprites.front_default) {
          console.log(`Sprite Missing PokeId <${pokemon.pokemonId}>`)
        }
        const sprite = pokemonData.sprites.front_default ?? ""
        return {...pokemon, sprite}
      }))
    }
  })
