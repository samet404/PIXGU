import type { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { CanvasesMainDataProvider } from './components/CanvasesMainData'
import type { User } from 'lucia'

const AblyClient = dynamic(() => import('./components/AblyClient'), {
  ssr: false,
})

export const Part1 = ({ myUserInfo, roomID, children }: Props) => {
  return (
    <CanvasesMainDataProvider>
      <AblyClient roomID={roomID}>{children} </AblyClient>
    </CanvasesMainDataProvider>
  )
}

type Props = {
  myUserInfo: User
  roomID: string
} & PropsWithChildren
