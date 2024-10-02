'use client'

import Image from 'next/image'
import img from '@/svg/thunder-f-svgrepo-com.svg'
import { Button } from './Button'
import { openPanelAtom } from '../../atoms'
import { useAtom } from 'jotai'

export const Powerups = () => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  return (
    <Button
      key={'powerups'}
      onKeyDown={(e, after) => {
        if (e.key === 'p' && (e.target as HTMLElement).tagName !== 'INPUT') {
          e.preventDefault()
          if (openPanel === 'power-ups') setOpenPanel(null)
          else setOpenPanel('power-ups')
          after()
        }
      }}
      onMouseDown={() => {
        if (openPanel === 'power-ups') setOpenPanel(null)
        else setOpenPanel('power-ups')
      }}
      className="hover size-9 rounded-lg bg-[#ffffff4a] p-1 hover:bg-[rgba(255,230,0,0.62)]"
      icon={<Image src={img} alt="download" className="opacity-60" />}
    />
  )
}
