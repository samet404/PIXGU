import { Provider } from 'jotai'
import { type ReactNode } from 'react'

const Jotai = ({ children }: { children?: ReactNode }) => {
  return <Provider>{children}</Provider>
}

export default Jotai
