'use client'

import Me from './components/Me'
import { Others } from './components/Others'

const PlayersSection = () => {
  return (
    <div className="flex h-full w-full flex-col justify-start gap-1 rounded-lg">
      <Me />
      <Others />
    </div>
  )
}

export default PlayersSection
