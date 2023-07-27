'use client'

import { TrianglePreview } from '@/components/TrianglePreview'
import TriangleSubmitForm from '@/components/TriangleSubmitForm'
import { TriangleProvider } from '@/utils/TriangleContext'
import { Toaster } from 'sonner'

export default function Home() {
  return (
    <TriangleProvider>
      <TriangleSubmitForm />
      <TrianglePreview />
      <Toaster richColors />
    </TriangleProvider>
  )
}
