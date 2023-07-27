export const parseTriangle = (triangle: string) => {
  const rows = triangle.trim().split('\n')

  const parsedTriangle = rows.map((row) => {
    const cols = row.trim().replace(/\s+/g, ' ').split(' ')
    return cols.map((element) => parseInt(element, 10))
  })

  return parsedTriangle
}
