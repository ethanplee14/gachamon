
export function dayDiff(first: Date, second: Date) {
  const firstDate = new Date(first.toDateString())
  const secondDate = new Date(second.toDateString())
  return (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
}
