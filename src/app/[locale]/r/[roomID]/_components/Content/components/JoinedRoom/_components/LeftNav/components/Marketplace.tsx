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
      onKeyDown={(e, after) => {
        if (e.key !== 'm' || (e.target as HTMLElement).tagName === 'INPUT')
          return
        if (openPanel === 'marketplace') setOpenPanel(null)
        else setOpenPanel('marketplace')
        after()
      }}
      className="hover:from-[#cf076b]"
      onMouseDown={() => setOpenPanel('marketplace')}
      icon={<Shop className="h-full w-full fill-[#ffffff7e]" />}
    />
  )
}
