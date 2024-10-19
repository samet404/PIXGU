'use client'

import Spinner from '@/components/Spinner'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { clsxMerge } from '@/utils/clsxMerge'
import { useHostingHealth, useSocketIO } from '@/zustand/store'
import { useState, type PropsWithChildren } from 'react'
import { io, type ManagerOptions, type SocketOptions } from 'socket.io-client'
import { Inter } from 'next/font/google'
import { env } from '@/env/client'

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

/**
 * SocketIOProvider is a provider that handles socket.io connection.
 */
export const SocketIOProvider = ({ children }: Props) => {
  const NAMESPACE = ''
  const OPTS: Partial<ManagerOptions & SocketOptions> = {}

  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const setIO = useSocketIO((s) => s.setIO)

  useEffectOnce(() => {
    setIO(
      io(`${env.NEXT_PUBLIC_SOCKETIO_URI}/${NAMESPACE}`, {
        autoConnect: false,
        withCredentials: true,
        secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
        ...OPTS,
      }),
    )

    useSocketIO.getState().io!.on('connect', () => {
      console.log('connected')
      setIsConnected(true)
      useSocketIO.getState().io!.emit('auth')
    })

    useSocketIO.getState().io!.once('is-logged', (status: boolean) => {
      console.log('is-logged', status)
    })

    useSocketIO.getState().io!.on('disconnect', () => {
      console.log('disconnected')
    })

    useSocketIO.getState().io!.on('connect_error', (err) => {
      console.error(err)
      setError(err.message)
    })

    useSocketIO.getState().io!.on('reconnect_error', (e) => {
      console.error(e)
      setError(`reconnect_error: ${e.message}`)
    })

    if (!OPTS?.autoConnect) useSocketIO.getState().io!.connect()
    return () => {
      useSocketIO.getState().io!.disconnect()
    }
  })

  if (isConnected) return children
  return (
    <div
      className={clsxMerge(
        `${inter.className} flex h-full w-full flex-col items-center justify-center gap-4 text-white`,
        {
          'bg-rose-500': error,
        },
      )}
    >
      <div>
        {error
          ? 'Error while connecting to socket server'
          : 'Connecting to socket server'}
      </div>
      <div>{error ? error : <Spinner className="drop-shadow-none" />}</div>
    </div>
  )
}

type Props = PropsWithChildren
