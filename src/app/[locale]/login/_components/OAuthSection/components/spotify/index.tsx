'use client'

import Link from 'next/link'
import { Btn } from './components/Btn'

export const Spotify = () => {
  return (
    <Link href={`/login/spotify`}>
      <Btn />
    </Link>
  )
}
