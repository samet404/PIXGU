import ToSocket from './components/ToSocket'
import { type ReactNode } from 'react'
import dynamic from 'next/dynamic'

const ToWebRTC = dynamic(() => import('./components/ToWebRTC'), {
  ssr: false,
})

const Connect = ({ children }: Props) => {
  return (
    <ToSocket>
      <ToWebRTC>{children}</ToWebRTC>
    </ToSocket>
  )
}

export default Connect

type Props = {
  children: ReactNode
}
