'use client'

import { useAtom } from 'jotai'
import { Button } from './Button'
import { openPanelAtom } from '../../atoms'

export const Marketplace = () => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  return (
    <Button
      text="Marketplace"
      keyName="M"
      onKeyDown={(e) => {
        if (e.key !== 'm' || (e.target as HTMLElement).tagName === 'INPUT')
          return
        if (openPanel === 'marketplace') setOpenPanel(null)
        else setOpenPanel('marketplace')
      }}
      className="hover:from-[#cf076b]"
      onClick={() => setOpenPanel('marketplace')}
    />
  )
}
