import { type ReactNode } from 'react'
import Jotai from './components/Jotai'
import Trpc from './components/Trpc'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Trpc>
      <Jotai>{children}</Jotai>
    </Trpc>
  )
}

export default Providers