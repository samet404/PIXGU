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
  weight: ['600', '700'],
})

/**
 * SocketIOProvider is a provider that handles socket.io connection.
 */
export const SocketIOProvider = ({ children }: Props) => {
  const NAMESPACE = 'cr'
  const OPTS: Partial<ManagerOptions & SocketOptions> = {}

  const [status, setStatus] = useState<{
    error: string | null
    isConnected: boolean
    isLoading: boolean
  }>({
    error: null,
    isLoading: true,
    isConnected: false,
  })
  const { error, isConnected, isLoading } = status
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
      setStatus({
        error: null,
        isLoading: false,
        isConnected: true,
      })
      useSocketIO.getState().io!.emit('auth')
    })

    useSocketIO.getState().io!.once('is-logged', (status: boolean) => {
      console.log('is-logged', status)
    })

    useSocketIO.getState().io!.on('disconnect', () => {
      console.log('disconnected')
      setStatus({
        error: 'Disconnected',
        isLoading: false,
        isConnected: false,
      })
    })

    useSocketIO.getState().io!.on('connect_error', (err) => {
      console.error(err)
      setStatus({
        error: err.message,
        isLoading: false,
        isConnected: false,
      })
      useHostingHealth.getState().set('wsError')
    })

    useSocketIO.getState().io!.on('reconnect_error', (e) => {
      console.error(e)
      setStatus({
        error: 'reconnect_error: ' + e.message,
        isLoading: false,
        isConnected: false,
      })
    })

    useSocketIO.getState().io!.on('reconnect_attempt', (e) => {
      console.log('reconnecting')
      setStatus({
        error: null,
        isLoading: true,
        isConnected: false,
      })
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
        `${inter.className} flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg text-white`,
        {
          'animate-animate-err-pulse-shadow bg-gradient-to-tr from-rose-500 to-rose-400':
            error,
        },
      )}
    >
      <div className="font-[700]">
        {error && 'Error at socket connection'}
        {isLoading && 'Connecting to socket server'}
      </div>
      {error && <div>{error}</div>}
      {isLoading && <Spinner />}
    </div>
  )
}

type Props = PropsWithChildren
