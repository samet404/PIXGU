import Link from 'next/link'
import { Btn } from './components/Btn'

export const Github = () => {
  return (
    <Link href={`/login/github`}>
      <Btn />
    </Link>
  )
}
