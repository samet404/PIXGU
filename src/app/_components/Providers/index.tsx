import { type ReactNode } from 'react'
import ReactQueryProvider from './components/ReactQueryProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}

export default Providers
