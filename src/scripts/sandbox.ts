//@ts-nocheck
import {rollStat} from "../server/pokemon/stat";
import {randomIntRange, randomRange} from "../utils/math";

async function main() {
  const yesterday = new Date()
  yesterday.setMonth(6)
  yesterday.setDate(31)
  console.log(yesterday.toISOString())

  const lastRolled = new Date(yesterday.toDateString())
  const currentDay = new Date(new Date().toDateString())
  console.log("Last rolled: " + lastRolled)
  console.log("Current day: " + currentDay)
  const dayDiff = (currentDay.getTime() - lastRolled.getTime()) / (1000 * 60 * 60 * 24)
  console.log(dayDiff)
  if(dayDiff > 0 && 0 < 3) {
    console.log("Returning 3")
  } else {
    console.log("Return normal")
  }
  // const ranks = []
  // let [belowHalf, aboveHalf] = [0, 0]
  //
  // for (let i = 0; i < 1000; i++) {
  //   const rank = rollStat()
  //   ranks.push(rank)
  //   if(rank <= 450)
  //     belowHalf += 1
  //   else
  //     aboveHalf += 1
  // }
  // console.log("Below half: " + belowHalf)
  // console.log("Above half: " + aboveHalf)
}

main().catch(console.log)

export {}
