'use client'

import { Button } from './Button'
import { openPanelAtom } from '../../atoms'
import { useAtom } from 'jotai'

export const Players = () => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  return (
    <Button
      text="Players"
      keyName="P"
      onKeyDown={(e) => {
        if (e.key !== 'p' || (e.target as HTMLElement).tagName === 'INPUT')
          return

        if (openPanel === 'players') setOpenPanel(null)
        else setOpenPanel('players')
      }}
      className="hover:from-[#07cf86]"
      onClick={() => setOpenPanel('marketplace')}
    />
  )
}
