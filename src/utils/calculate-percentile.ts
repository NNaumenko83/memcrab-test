export const calculatePercentile = (arr: number[], percentile: number) => {
    if (!arr.length) return 0
    const sorted = [...arr].sort((a, b) => a - b)
    const n = sorted.length
    if (n === 1) return sorted[0]
    const rank = (n - 1) * (percentile / 100)
    const lowerIndex = Math.floor(rank)
    const upperIndex = Math.ceil(rank)
    const fraction = rank - lowerIndex
    return (sorted[lowerIndex] + (sorted[upperIndex] - sorted[lowerIndex]) * fraction).toFixed(1)
}