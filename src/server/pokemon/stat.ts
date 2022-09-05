import rankings from "../../../res/total-ranking.json"
import {nearestNumber, randomIntRange} from "../../utils/math";

export interface Stats {
  name: string,
  hp: number, attack: number,
  defense: number, specialAttack: number,
  specialDefense: number, speed: number
  total: number
}


/**
 * Rolls random stats from
 */
export function rollStat() {
  if (!rankings || rankings.length < 1)
    throw new Error("Failed to load rankings: " + rankings)

  const [rollChance, slopeSteepness] = [1000, 2.5]

  const [minTotal, maxTotal] = [rankings[0]!.total, rankings[rankings.length-1]!.total]
  const slopeCoeff = Math.pow((maxTotal - minTotal), 1/slopeSteepness) / rollChance

  const roll = randomIntRange(0, rollChance)
  return Math.round(Math.pow(slopeCoeff * roll, slopeSteepness) + minTotal)
}

export function randomPokemonNearestTo(totalStat: number) {
  const nearestRank = nearestNumber(totalStat, rankings.map(rank => rank.total))
  const pokemonWithRank = rankings.filter(rank => rank.total == nearestRank)
  return pokemonWithRank[randomIntRange(0, pokemonWithRank.length)]!
}
