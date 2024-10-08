'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useHostingHealth, useSocketIO } from '@/zustand/store'
import { useRef, type PropsWithChildren } from 'react'
import { io, type Socket } from 'socket.io-client'

export const SocketIO = ({ roomID, children }: Props) => {
  const setIO = useSocketIO((s) => s.setIO)
  const socketRef = useRef<Socket>(
    io('http://localhost:5000/host', {
      autoConnect: false,
      withCredentials: true,
      auth: {
        roomID,
      },
    }),
  )
  setIO(socketRef.current)

  useEffectOnce(() => {
    console.log(socketRef.current)

    socketRef.current.on('connect', () => {
      console.log('connected')
      socketRef.current.emit('login')
    })

    socketRef.current.once('login-status', (status: 'success' | 'failed') => {
      console.log('login-status', status)
    })

    socketRef.current.on('disconnect', () => {
      console.log('disconnected')
    })

    socketRef.current.on('connect_error', (err) => {
      console.error(err)
      useHostingHealth.getState().set('wsError')
    })

    socketRef.current.on('connect_failed', () => {
      console.log('connect_failed')
    })

    socketRef.current.on('error', () => {
      console.log('error')
    })

    socketRef.current.on('reconnect_error', () => {
      console.log('reconnect_error')
    })

    socketRef.current.connect()

    return () => {
      socketRef.current.disconnect()
    }
  })

  return children
}

type Props = PropsWithChildren<{
  roomID: string
}>
