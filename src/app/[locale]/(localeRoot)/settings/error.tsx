'use client'

import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['800', '500'],
})

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const handleClick = () => {
    reset()
  }

  return (
    <div
      className={`${inter.className} flex h-full w-full flex-col items-center justify-center bg-rose-400`}
    >
      <h2 className="font-[800]">Ups, Something went wrong :/</h2>
      <div className="pb-3 font-[500] text-[rgba(0,0,0,0.6)]">
        {"Contact us if trying again doesn't work"}
      </div>
      <button
        className="rounded-md bg-[rgba(255,255,255,0.5)] p-2 text-[rgba(0,0,0,0.6)]"
        onClick={() => handleClick()}
      >
        Try again
      </button>
    </div>
  )
}

export default Error
