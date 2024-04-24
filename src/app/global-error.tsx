'use client' // Error components must be Client Components

import ErrDisplay from '@/components/ErrDisplay'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <ErrDisplay
      onClick={() => reset()}
      msg="Something went wrong, Click me to try again!"
    />
  )
}
