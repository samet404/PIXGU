'use client'

import { Outfit } from 'next/font/google'
import { User } from './components/User'
import { Timer } from './components/Timer'
import { useNewPainterPanel } from '@/zustand/store'
import { Fragment } from 'react'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700'],
})

export const NewPainter = () => {
  const panelValues = useNewPainterPanel((s) => s.value)

  if (panelValues.isOpen)
    return (
      <div
        className={`h-full w-full ${outfit.className} absolute z-50 flex h-full w-full items-center justify-center`}
      >
        {panelValues.status === 'selectingTheme' ? (
          <Fragment>
            <Timer />
            <User />
          </Fragment>
        ) : null}
      </div>
    )
}
