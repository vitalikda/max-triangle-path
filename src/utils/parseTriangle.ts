export const parseTriangle = (triangle: string): Promise<number[][]> => {
  return new Promise((resolve, reject) => {
    const rows = triangle.trim().split('\n')

    const parsedTriangle = rows.map((row) => {
      const cols = row.trim().replace(/\s+/g, ' ').split(' ')

      return cols.map((element) => {
        const num = parseInt(element, 10)

        if (isNaN(num)) {
          reject(new Error('Invalid triangle'))
        }

        return num
      })
    })

    resolve(parsedTriangle)
  })
}
