export const getMaxPath = (
  triangle: number[][],
): { sum: number; path: number[] } => {
  const len = triangle.length

  // handle base cases
  if (len === 0) {
    return {
      sum: 0,
      path: [],
    }
  }
  if (len === 1) {
    return {
      sum: triangle[0][0],
      path: [0],
    }
  }

  const tri = triangle.map((row) => [...row])

  // calculate the maximum sum for each element, starting from the second from the bottom row
  for (let level = len - 2; level >= 0; level--) {
    for (let col = 0; col < tri[level].length; col++) {
      const leftChild = tri[level + 1][col]
      const rightChild = tri[level + 1][col + 1]

      // sum the current element with the maximum of the two possible paths above it
      tri[level][col] += Math.max(leftChild, rightChild)
    }
  }

  const path = tri.reduce((acc, row, level) => {
    if (level === 0) return [0]

    const prevCol = acc[level - 1]
    const col = prevCol + Number(row[prevCol] < row[prevCol + 1])

    return [...acc, col]
  }, [])

  return {
    sum: tri[0][0],
    path,
  }
}
