import { useContext, createContext, useState } from 'react'

export const TriangleContext = createContext({
  triangle: undefined as number[][] | undefined,
  setTriangle: (triangle?: number[][]) => {},
})

export const TriangleProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [triangle, setTriangle] = useState<number[][]>()

  return (
    <TriangleContext.Provider value={{ triangle, setTriangle }}>
      {children}
    </TriangleContext.Provider>
  )
}

export const useTriangle = () => useContext(TriangleContext)
