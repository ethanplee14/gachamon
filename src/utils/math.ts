/**
 * Rolls random integer between 2 numbers.
 * @param min
 * @param max
 */
export function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Rolls random integer between 2 numbers. Min number is inclusive while max is exclusive.
 * @param min minimum range number. (will round down if decimal)
 * @param max maximum range number. (will round up if decimal)
 */
export function randomIntRange(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(randomRange(min, max))
}

export function nearestNumberIndex(origin: number, numbers: number[]) {
  if(numbers.length === 0)
    throw new Error("Passed in numbers is empty")

  let nearestIndex = 0
  for(let i = 0; i < numbers.length; i++) {
    const currentDiff = Math.abs(numbers[i]! - origin)
    const nearestDiff = Math.abs(numbers[nearestIndex]! - origin)
    if (currentDiff < nearestDiff)
      nearestIndex = i
  }

  return nearestIndex
}

export function nearestNumber(origin: number, numbers: number[]) {
  return numbers[nearestNumberIndex(origin, numbers)]
}
