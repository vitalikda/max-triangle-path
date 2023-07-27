import { useTriangle } from '@/utils/TriangleContext'
import { css } from '@/utils/css'
import { getMaxPath } from '@/utils/getMaxPath'
import { useState, useRef, useEffect, type RefObject } from 'react'

const useScrollResize = (ref: RefObject<HTMLElement>) => {
  const [scale, setScale] = useState(1)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (!ref.current) return

      const { height } = ref.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const direction = scrollY > 0 ? 'down' : 'up'
      const distance = Math.abs(scrollY)
      const percentage = distance / height
      const scale = Math.max(1 - percentage * 0.99, 0.3)
      const translateY = Math.min(percentage * 100, 50)

      if (direction === 'down') {
        setScale(scale)
        setTranslateY(-translateY)
      }

      if (direction === 'up') {
        setScale(scale)
        setTranslateY(translateY)
      }
    }

    window.addEventListener('scroll', (e) => handleScroll(e))
    return () => window.removeEventListener('scroll', (e) => handleScroll(e))
  }, [ref])

  return { scale, translateY }
}

export const TrianglePreview = () => {
  const { triangle, setTriangle } = useTriangle()
  const ref = useRef<HTMLDivElement>(null)
  const { scale, translateY } = useScrollResize(ref)

  if (!triangle) return null

  const maxPath = getMaxPath(triangle)

  return (
    <div className="w-full h-full">
      <div className="mb-8 md:top-10 md:right-10 md:fixed md:z-20">
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm h-14 w-96">
          <div className="flex items-center space-x-1 text-sm text-gray-900">
            <span>Sum of the max path:</span>
            <span className="font-semibold">{maxPath.sum}</span>
          </div>
          <button
            onClick={() => setTriangle()}
            className="px-2 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
          >
            Reset
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex flex-col w-full h-full transition-all"
        style={{
          transform: `scale(${scale}) translateY(${translateY}%)`,
        }}
      >
        {triangle.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center justify-center w-full flex-nowrap"
          >
            {row.map((col, colIndex) => {
              const isMaxPath = maxPath.path[rowIndex] === colIndex
              return (
                <div
                  key={colIndex}
                  className={css(
                    'flex-none flex items-center justify-center m-1 w-9 h-9 text-xs font-bold text-white bg-blue-500 rounded-full opacity-0 animate-fade-in',
                    isMaxPath ? '' : 'bg-opacity-50',
                  )}
                  style={{ animationDelay: `${rowIndex * 50}ms` }}
                >
                  {col}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
