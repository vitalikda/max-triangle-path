'use client';

import { TrianglePreview } from '@/components/TrianglePreview';
import TriangleSubmitForm from '@/components/TriangleSubmitForm';
import { ThemeProvider } from '@/utils/TriangleContext';

export default function Home() {
  return (
    <ThemeProvider>
      <TriangleSubmitForm />
      <TrianglePreview />
    </ThemeProvider>
  )
}
