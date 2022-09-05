import {createRouter} from "./context";
import {randomPokemonNearestTo, rollStat} from "../pokemon/stat";
import {pokedex} from "../pokemon/pokedex";


export const pokeRouter = createRouter()
  .mutation("roll", {
    async resolve() {
      const randomStat = rollStat()
      const pokemonStats = randomPokemonNearestTo(randomStat)
      const pokemon = await pokedex.getPokemonByName(pokemonStats.name)
      return {
        name: pokemon.name,
        sprite: pokemon.sprites.front_default ?? ""
      }
    }
  })
