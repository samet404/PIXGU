'use client'

import type { PropsWithChildren } from 'react'

export const Container = ({ children }: PropsWithChildren) => {

  return (
    <div
      className={'h-[95%] overflow-y-auto flex flex-col gap-2'}
    >
      {children}
    </div>
  )
}
