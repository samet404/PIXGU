'use client'

import Spinner from '@/components/Spinner'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { clsxMerge } from '@/utils/clsxMerge'
import { useHostingHealth, useSocketIO } from '@/zustand/store'
import { useState, type PropsWithChildren } from 'react'
import { io, type ManagerOptions, type SocketOptions } from 'socket.io-client'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

export const SocketIO = ({ namespace, opts, children }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const setIO = useSocketIO((s) => s.setIO)

  useEffectOnce(() => {
    setIO(
      io(`http://localhost:5000/${namespace}`, {
        autoConnect: false,
        withCredentials: true,
        secure: false,
        ...opts,
      }),
    )

    const ioRef = useSocketIO.getState().io!

    ioRef.on('connect', () => {
      console.log('connected')
      setIsConnected(true)
      ioRef.emit('auth')
    })

    ioRef.once('is-logged', (status: boolean) => {
      console.log('is-logged', status)
    })

    ioRef.on('disconnect', () => {
      console.log('disconnected')
    })

    ioRef.on('connect_error', (err) => {
      console.error(err)
      setError(err.message)

      useHostingHealth.getState().set('wsError')
    })

    ioRef.on('connect_failed', () => {
      console.log('connect_failed')
    })

    ioRef.on('error', () => {
      console.log('error')
    })

    ioRef.on('reconnect_error', () => {
      console.log('reconnect_error')
    })

    if (!opts?.autoConnect) ioRef.connect()
    return () => {
      ioRef.disconnect()
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

type Props = PropsWithChildren<{
  namespace?: string
  opts?: Partial<ManagerOptions & SocketOptions>
}>
