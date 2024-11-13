'use client'

import { useAtom } from 'jotai'
import { Button } from './Button'
import { openPanelAtom } from '../../atoms'
import { Shop } from '@/components/svg/Shop'

export const Marketplace = () => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  return (
    <Button
      key={'marketplace'}
      className="hover:from-[#cf076b]"
      onMouseDown={() => setOpenPanel('marketplace')}
      icon={<Shop className="h-full w-full fill-[#ffffff7e]" />}
    />
  )
}
