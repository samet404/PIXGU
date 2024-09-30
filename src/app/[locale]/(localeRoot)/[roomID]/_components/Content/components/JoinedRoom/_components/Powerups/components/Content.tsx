'use client'

import { usePowerups } from '@/zustand/store'
import { Button } from './Button'
import { Fragment } from 'react'

export const Content = () => {
  const powerUps = usePowerups((s) => s.ownedPowerups.arr)

  return (
    <Fragment>
      {/* <Image
        src={bg}
        className="absolute left-0 top-0 z-10 h-full w-full"
        alt="powerups"
      />
      */}

      {powerUps.map(({ name, count }) => (
        <Button count={count} name={name} key={name} />
      ))}
    </Fragment>
  )
}
