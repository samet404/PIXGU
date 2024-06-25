import type { PropsWithChildren } from 'react'
import { CanvasesData } from './components/CanvasesData'
import { CurrentAndNextPainter } from './components/CurrentAndNextPainter'
import Peers from './components/Peers'
import dynamic from 'next/dynamic'

const AblyClient = dynamic(() => import('./components/AblyClient'), {
  ssr: false,
})

export const Part1 = ({ roomID, children }: Props) => {
  return (
    <CanvasesData>
      <AblyClient roomID={roomID}>
        <CurrentAndNextPainter>
          <Peers>{children}</Peers>
        </CurrentAndNextPainter>
      </AblyClient>
    </CanvasesData>
  )
}

type Props = {
  roomID: string
} & PropsWithChildren
