import { useTriangle } from '@/utils/TriangleContext';
import { parseTriangle } from '@/utils/parseTriangle';
import { type FormEvent, type ChangeEvent, useRef } from 'react';
import { toast } from 'sonner';

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-500" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const TriangleSubmitForm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { triangle, setTriangle } = useTriangle()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        const triangleStr = e.target?.result
        if (typeof triangleStr === 'string') {
          try {
            const triangleArray = await parseTriangle(triangleStr)
            setTriangle(triangleArray)
          } catch {
            toast.error('Please enter a valid triangle')
          }
        }
      }

      reader.readAsText(file)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    const triangleStr = data.get('triangle-text') as string | undefined
    if (triangleStr) {
      try {
        const triangleArray = await parseTriangle(triangleStr)
        setTriangle(triangleArray)
      } catch {
        toast.error('Please enter a valid triangle')
      }
    }
  }

  const handleFormClear = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = ''
    }
  }

  if (triangle) return null

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-6 font-mono text-sm">
      <div className="w-full">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Upload a triangle file
        </label>
        <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25 bg-gradient-to-b from-zinc-200">
          <div className="text-center">
            <FileIcon />
            <div className="flex mt-4 text-sm leading-6 text-gray-600">
              <label
                htmlFor="triangle-file"
                className="relative font-semibold text-blue-600 bg-transparent rounded-md cursor-pointer focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-300 focus-within:ring-offset-1 hover:text-blue-500"
              >
                <span>Upload a file</span>
                <input id="triangle-file" name="triangle-file" type="file" multiple={false} accept='txt' onChange={handleFileChange} className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              Supported file types: .txt
            </p>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <label htmlFor="triangle-text" className="block text-sm font-medium leading-6 text-gray-900">
          Or enter it manually here
        </label>
        <textarea
          ref={textAreaRef}
          id="triangle-text"
          name="triangle-text"
          rows={3}
          className='block w-full mt-2 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl'
        ></textarea>
      </div>
      <div className="flex items-center justify-end gap-x-6">
        <button type="button" onClick={handleFormClear} className="text-sm leading-6 text-gray-900">
          Clear
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
        >
          Submit
        </button>
      </div>
    </form >
  )
}

export default TriangleSubmitForm