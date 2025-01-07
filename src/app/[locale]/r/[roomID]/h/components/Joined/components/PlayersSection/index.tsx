'use client'

import { useAtomValue } from 'jotai'
import { selectedPanelItemAtom } from '../atom'
import { Count } from './components/Count'
import { Players } from './components/Players'

export const PlayersSection = () => {
  const selectedItem = useAtomValue(selectedPanelItemAtom)


  if (selectedItem === 'Players') return (
    <section className="flex w-[90%] flex-col items-center gap-4">
      <div className="flex flex-col gap-1">
        <Count />
      </div>

      <Players />
    </section>
  )
}
