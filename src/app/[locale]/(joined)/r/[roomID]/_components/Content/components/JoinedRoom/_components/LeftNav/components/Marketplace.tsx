'use client'

import { useAtom } from 'jotai'
import { Button } from './Button'
import { openPanelAtom } from '../../atoms'
import { Svg } from '@/components/Svg'

export const Marketplace = () => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  return (
    <Button
      shortcutName='Marketplace'
      key={'marketplace'}
      className="hover:bg-[#cf076b]"
      onMouseDown={() => {
        if (openPanel === 'marketplace') setOpenPanel(null)
        else setOpenPanel('marketplace')
      }}
      icon={<Svg src='shop.svg' alt="shop" className="h-full w-full opacity-60" />}
    />
  )
}
