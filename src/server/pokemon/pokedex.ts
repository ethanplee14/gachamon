
import {GameClient, PokemonClient} from "pokenode-ts"

declare global {
  var pokedex: PokemonClient | undefined
  var pokeGame: GameClient | undefined
}
export const pokedex = global.pokedex || new PokemonClient()
export const pokeGame = global.pokeGame || new GameClient()
