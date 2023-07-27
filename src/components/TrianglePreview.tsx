import { useTriangle } from '@/utils/TriangleContext'
import { css } from '@/utils/css'
import { getMaxPath } from '@/utils/getMaxPath'

export const TrianglePreview = () => {
  const { triangle } = useTriangle()

  if (!triangle) return null

  const maxPath = getMaxPath(triangle)

  return (
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <div>
        {triangle.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center">
            {row.map((col, colIndex) => {
              const isMaxPath = maxPath.path[rowIndex] === colIndex
              return (
                <div key={colIndex} className="flex justify-center w-8 h-8 m-1">
                  <span className={css(
                    'flex items-center justify-center w-full h-full text-xs font-bold text-center text-white bg-blue-500 rounded-full',
                    isMaxPath ? 'bg-opacity-100' : 'bg-opacity-50'
                  )}>
                    {col}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}