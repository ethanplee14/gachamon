// @ts-nocheck
import fs from "fs/promises"

async function main() {
  const pokemonStatsStr = await Promise.all([
    await fs.readFile("./res/rankings/gen1-rankings.json", "utf-8"),
    await fs.readFile("./res/rankings/gen2-rankings.json", "utf-8"),
    await fs.readFile("./res/rankings/gen3-rankings.json", "utf-8"),
    await fs.readFile("./res/rankings/gen4-rankings.json", "utf-8")
  ])
  const pokemonRankings = []

  for (const statStr of pokemonStatsStr) {
    const stats = JSON.parse(statStr)
    for (const stat of stats) {
      pokemonRankings.push(stat)
    }
  }
  pokemonRankings.sort((first, second) => {
    if (first["total"] < second["total"]) {
      return -1
    } else if (first["total"] > second["total"]) {
      return 1
    } else {
      return 0
    }
  })
  await fs.writeFile("./res/total-ranking.json", JSON.stringify(pokemonRankings))
}

main().catch(e => console.log(e))

export {}
