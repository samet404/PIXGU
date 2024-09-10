'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { SoketiClientCtx } from '@/context/client/react'
import { getPusherClient } from '@/pusher/client'
import type Pusher from 'pusher-js'

export const SoketiClient = ({ children, roomID }: Props) => {
  const soketiClientRef = useRef<Pusher>(
    getPusherClient({
      authEndpoint: `${window.location.href}/api/pusher/auth`,
      cluster: 'your_cluster',
    }),
  )

  console.log('soketiClient', soketiClientRef.current)

  useEffect(() => {
    const handleConnectionStateChange = (state: string) => {
      console.log('Connection state changed:', state)
      if (state === 'disconnected' || state === 'failed') {
        console.error(
          `Connection ${state}. Please check your internet connection.`,
        )
      }
    }

    const handleError = (err: any) => {
      console.error('Pusher error:', err)
    }

    soketiClientRef.current.connection.bind(
      'state_change',
      handleConnectionStateChange,
    )
    soketiClientRef.current.connection.bind('error', handleError)

    soketiClientRef.current.connection.bind('connected', () => {
      console.log('Connected to Pusher')
    })

    soketiClientRef.current.connection.bind('disconnected', () => {
      console.log('Disconnected from Pusher')
      console.warn('Disconnected from the server. Attempting to reconnect...')
    })

    soketiClientRef.current.connection.bind('failed', () => {
      console.error('Connection to Pusher failed')
      console.error(
        'Failed to connect to the server. Please refresh the page or try again later.',
      )
    })

    soketiClientRef.current.connection.bind(
      'pusher:subscription_succeeded',
      () => {
        console.log('pusher:subscription_succeeded')
      },
    )

    soketiClientRef.current.connection.bind('pusher:error', (err: any) => {
      console.error('pusher:error', err)
    })

    soketiClientRef.current.connection.bind('pusher:ping', (latency: any) => {
      console.log('pusher:ping', latency)
    })

    return () => {
      soketiClientRef.current.disconnect()
    }
  }, [])

  return (
    <SoketiClientCtx.Provider value={soketiClientRef.current}>
      {children}
    </SoketiClientCtx.Provider>
  )
}

type Props = {
  children: ReactNode
  roomID: string
}
