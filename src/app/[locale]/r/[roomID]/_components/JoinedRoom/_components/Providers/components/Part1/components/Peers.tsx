import { type ReactNode } from 'react'
import { PeersContext } from '@/context/client'

const Peers = ({ children }: Props) => (
  <PeersContext.Provider value={{}}>{children}</PeersContext.Provider>
)

export default Peers

type Props = {
  children: ReactNode
}
