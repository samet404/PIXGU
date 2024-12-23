'use client'

import Link from 'next/link'
import { Btn } from './components/Btn'

export const Discord = () => {
  return (
    <Link href={`/login`}>
      <Btn />
    </Link>
  )
}
