import { getMaxPath } from './getMaxPath'

describe('getMaxPath', () => {
  it('basic triangle', () => {
    const triangle = [[1], [2, 3], [4, 5, 6]]
    const expected = { sum: 10, path: [0, 1, 2] }
    const result = getMaxPath(triangle)
    expect(result).toEqual(expected)
  })

  it('triangle with zero rows', () => {
    const triangle: number[][] = []
    const expected = { sum: 0, path: [] }
    const result = getMaxPath(triangle)
    expect(result).toEqual(expected)
  })

  it('triangle with a single row', () => {
    const triangle = [[1]]
    const expected = { sum: 1, path: [0] }
    const result = getMaxPath(triangle)
    expect(result).toEqual(expected)
  })

  it('triangle with negative numbers', () => {
    const triangle = [[1], [-2, 3], [4, -5, 6]]
    const expected = { sum: 10, path: [0, 1, 2] }
    const result = getMaxPath(triangle)
    expect(result).toEqual(expected)
  })

  it('triangle with duplicate numbers', () => {
    const triangle = [[1], [2, 3], [4, 4, 4], [5, 6, 7, 8]]
    const expected = { sum: 16, path: [0, 1, 2, 3] }
    const result = getMaxPath(triangle)
    expect(result).toEqual(expected)
  })
})
