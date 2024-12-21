'use client'

import { Button } from './Button'
import { openPanelAtom } from '../../atoms'
import { useAtom } from 'jotai'
import { Svg } from '@/components/Svg'

export const Powerups = () => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  return (
    <Button
      shortcutName='Powerups'
      key={'powerups'}
      onMouseDown={() => {
        if (openPanel === 'power-ups') setOpenPanel(null)
        else setOpenPanel('power-ups')
      }}
      className="hover:bg-[rgba(255,230,0,0.62)]"
      icon={<Svg src='thunder-f-svgrepo-com.svg' alt="star" className="h-full w-full opacity-40" />}
    />
  )
}
