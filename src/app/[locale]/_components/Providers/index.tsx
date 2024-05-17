import { type ReactNode } from 'react'
import Jotai from './components/Jotai'

const Providers = ({ children }: { children: ReactNode }) => {
  return <Jotai>{children}</Jotai>
}

export default Providers
