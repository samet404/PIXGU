import { type ReactNode } from 'react'
import Jotai from './components/Jotai'
import { Tabs } from './components/Tabs'
import { LogoutBroadcast } from './components/LogoutBroadcast'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Jotai>
      <Tabs>
        <LogoutBroadcast>
          {children}
        </LogoutBroadcast>
      </Tabs>
    </Jotai>
  )
}

export default Providers
