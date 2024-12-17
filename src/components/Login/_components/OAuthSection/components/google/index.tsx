'use client'

import Link from 'next/link'
import { Btn } from './components/Btn'

export const Google = () => {
  return (
    <Link href={`/login/google`}>
      <Btn />
    </Link>
  )
}
