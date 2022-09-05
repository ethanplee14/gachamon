//@ts-nocheck
import {pokedex, pokeGame} from "../server/pokemon/pokedex";
import fs from "fs/promises";



async function main() {
  const generation = await pokeGame.getGenerationById(4)
  const pokeNames = generation.pokemon_species.map(s => s.name)
  const pokeStats = {}
  await Promise.all(pokeNames.map(async name => {
    let pokeName = name
    if (pokeName == "giratina")
      pokeName = "giratina-origin"
    else if (pokeName == "shaymin")
      pokeName = "shaymin-land"
    else if(pokeName == "wormadam")
      pokeName = "wormadam-plant"
    const pokemon = await pokedex.getPokemonByName(pokeName)
    const stats = {hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0}
    pokemon.stats.forEach(stat => {
      switch(stat.stat.name) {
        case "hp":
          stats.hp = stat.base_stat
          break
        case "attack":
          stats.attack = stat.base_stat
          break
        case "defense":
          stats.defense = stat.base_stat
          break
        case "special-attack":
          stats.specialAttack = stat.base_stat
          break
        case "special-defense":
          stats.specialDefense = stat.base_stat
          break
        case "speed":
          stats.speed = stat.base_stat
          break
      }
    })
    pokeStats[name] = stats
  }))
  await fs.writeFile("./res/gen4-stats.json", JSON.stringify(pokeStats))

}


main().catch(console.log)
