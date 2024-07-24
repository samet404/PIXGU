import type { PropsWithChildren } from 'react'
import Peers from './components/Peers'
import { OtherStatues } from './components/OtherStatues'

export const JustHosting = ({ children, hostID, myID }: Props) =>
  hostID === myID ? (
    <Peers>
      <OtherStatues>{children}</OtherStatues>
    </Peers>
  ) : (
    children
  )

type Props = {
  hostID: string
  myID: string
} & PropsWithChildren
