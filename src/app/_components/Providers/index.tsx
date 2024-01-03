import { type ReactNode } from 'react'
import ReactQueryProvider from './components/ReactQueryProvider'
import { Provider } from 'jotai'
import JotaiProvider from './components/JotaiProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <JotaiProvider>{children}</JotaiProvider>
    </ReactQueryProvider>
  )
}

export default Providers
