import ToSocket from './components/ToSocket'
import { type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import MeetOthers from './components/MeetOthers'

const ToWebRTC = dynamic(() => import('./components/ToWebRTC'), {
  ssr: false,
})

const Connect = ({ children }: Props) => {
  return (
    <ToWebRTC>
      <ToSocket>
        <MeetOthers>{children}</MeetOthers>
      </ToSocket>
    </ToWebRTC>
  )
}

export default Connect

type Props = {
  children: ReactNode
}
