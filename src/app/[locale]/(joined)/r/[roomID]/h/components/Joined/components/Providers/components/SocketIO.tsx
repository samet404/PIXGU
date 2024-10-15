'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useHostingHealth, useSocketIO } from '@/zustand/store'
import { useRef, type PropsWithChildren } from 'react'
import { io, type Socket } from 'socket.io-client'

export const SocketIO = ({ roomID, children }: Props) => {
  const setIO = useSocketIO((s) => s.setIO)
  const ioRef = useRef<Socket>(
    io('http://localhost:5000/host', {
      autoConnect: false,
      withCredentials: true,
      auth: {
        roomID,
      },
      secure: false,
    }),
  )
  setIO(ioRef.current)

  useEffectOnce(() => {
    console.log(ioRef.current)

    ioRef.current.on('connect', () => {
      console.log('connected')
      ioRef.current.emit('auth')
    })

    ioRef.current.once('is-logged', (status: boolean) => {
      console.log('is-logged', status)
    })

    ioRef.current.on('disconnect', () => {
      console.log('disconnected')
    })

    ioRef.current.on('connect_error', (err) => {
      console.error(err)
      useHostingHealth.getState().set('wsError')
    })

    ioRef.current.on('connect_failed', () => {
      console.log('connect_failed')
    })

    ioRef.current.on('error', () => {
      console.log('error')
    })

    ioRef.current.on('reconnect_error', () => {
      console.log('reconnect_error')
    })

    ioRef.current.connect()

    return () => {
      ioRef.current.disconnect()
    }
  })

  return children
}

type Props = PropsWithChildren<{
  roomID: string
}>
