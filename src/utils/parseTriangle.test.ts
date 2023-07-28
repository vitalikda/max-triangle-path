import { parseTriangle } from './parseTriangle'

describe('parseTriangle', () => {
  it('basic triangle', async () => {
    const triangle = `
1
2 3
4 5 6`
    const expected = [[1], [2, 3], [4, 5, 6]]
    const result = await parseTriangle(triangle)
    expect(result).toEqual(expected)
  })

  it('triangle with negative numbers', async () => {
    const triangle = `
1
-2 3
4 -5 6`
    const expected = [[1], [-2, 3], [4, -5, 6]]
    const result = await parseTriangle(triangle)
    expect(result).toEqual(expected)
  })

  it('triangle with decimal numbers', async () => {
    const triangle = `
1
2.5 3.2
4.7 5 6.1`
    const expected = [[1], [2, 3], [4, 5, 6]]
    const result = await parseTriangle(triangle)
    expect(result).toEqual(expected)
  })

  it('invalid triangle with Nan', async () => {
    const triangle = `hi`
    await expect(parseTriangle(triangle)).rejects.toThrow('Invalid triangle')
  })

  it('invalid triangle with empty row', async () => {
    const triangle = ``
    await expect(parseTriangle(triangle)).rejects.toThrow('Invalid triangle')
  })
})
