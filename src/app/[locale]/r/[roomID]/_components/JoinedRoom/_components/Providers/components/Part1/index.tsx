import type { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { CanvasesMainDataProvider } from './components/CanvasesMainData'

const AblyClient = dynamic(() => import('./components/AblyClient'), {
  ssr: false,
})

export const Part1 = ({ roomID, children }: Props) => {
  return (
    <CanvasesMainDataProvider>
      <AblyClient roomID={roomID}>{children} </AblyClient>
    </CanvasesMainDataProvider>
  )
}

type Props = {
  roomID: string
} & PropsWithChildren
