import { Provider } from 'jotai'
import { type ReactNode } from 'react'

const JotaiProvider = ({ children }: { children?: ReactNode }) => {
  return <Provider>{children}</Provider>
}

export default JotaiProvider
