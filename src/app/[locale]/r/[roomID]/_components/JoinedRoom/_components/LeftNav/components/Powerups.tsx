'use client'

import { useCurrentPanel } from '@/zustand/store'
import { Button } from './Button'
import { Svg } from '@/components/Svg'

export const Powerups = () => {
  const currentPanel = useCurrentPanel(s => s.currentPanel)
  const setPanel = useCurrentPanel(s => s.setPanel)

  return (
    <Button
      shortcutName='Powerups'
      key={'powerups'}
      onMouseDown={() => {
        if (currentPanel === 'power-ups') setPanel(null)
        else setPanel('power-ups')
      }}
      className="hover:bg-[rgba(255,230,0,0.62)]"
      icon={<Svg src='thunder-f-svgrepo-com.svg' alt="star" className="h-full w-full opacity-40" />}
    />
  )
}
