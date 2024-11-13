import { type ReactNode } from 'react'
import Jotai from './components/Jotai'
import { Tabs } from './components/Tabs'
import { LogoutBroadcast } from './components/LogoutBroadcast'
import { Shortcut } from './components/Shortcut'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Jotai>
      <Tabs>
        <LogoutBroadcast>
          <Shortcut>
            {children}
          </Shortcut>
        </LogoutBroadcast>
      </Tabs>
    </Jotai>
  )
}

export default Providers
