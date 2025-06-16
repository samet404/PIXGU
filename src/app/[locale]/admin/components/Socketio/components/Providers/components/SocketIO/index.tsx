'use client'

import { useSocketIO } from '@/zustand/store/useSocketIO'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { io as createIO, type ManagerOptions, type SocketOptions } from 'socket.io-client'
import { env } from '@/env/client'
import { DisconnectedView } from './components/DisconnectedView'
import { LoadingView } from './components/LoadingView'
import { useAtomValue } from 'jotai'
import { wsUrlAtom } from '../../../atoms'

const NAMESPACE = 'admin'

const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  RECONNECT_ERROR: 'reconnect_error',
  RECONNECT_ATTEMPT: 'reconnect_attempt',
  SET_LAST_VERSION: 'set-last-version',
  VERSION_CHANGED: 'version-changed',
  PREPARE_RESTART: 'prepare-restart',
  FLUSHALL: 'flushall',
  AUTH: 'auth',
} as const

const useSocketSetup = (wsUrl: string) => {
  const initStatusState: StatusState = {
    error: [],
    isAuthSuccess: false,
    isLoading: true,
    isConnected: false,
    isDisconnected: false,
  }

  const [status, setStatus] = useState<StatusState>(initStatusState)
  const setIO = useSocketIO((s) => s.setIO)

  const setupSocketConnection = () => {
    const OPTS: Partial<ManagerOptions & SocketOptions> = {
      auth: { token: 'k3wzeu2cfwvp3r1ojjmwy17e6fme8l8cc9t059fe' },
      autoConnect: false,
      withCredentials: true,
      secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
    }

    setIO(createIO(`${wsUrl}/${NAMESPACE}`, OPTS))
    const io = useSocketIO.getState().io!

    io.on(SOCKET_EVENTS.CONNECT, () => {
      setStatus(prev => ({ ...prev, isConnected: true }))
    })

    io.on(SOCKET_EVENTS.AUTH, (authStatus: AuthStatus) => {
      console.log('authStatus: ', authStatus)
      if (authStatus.isSuccess) setStatus(prev => ({ ...prev, isAuthSuccess: authStatus.isSuccess }))
      else setStatus(prev => ({ ...prev, isAuthSuccess: false, error: [authStatus.reason] }))
    })

    io.on(SOCKET_EVENTS.DISCONNECT, () => {
      setStatus(prev => ({
        ...prev,
        isLoading: false,
        isConnected: false,
        isDisconnected: true,
      }))
    })

    // Error handlers
    io.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
      setStatus({ ...initStatusState, isLoading: false, error: [err.message] })
    })

    io.on(SOCKET_EVENTS.RECONNECT_ERROR, (e) => {
      setStatus({ ...initStatusState, error: [e.message] })
    })

    io.on(SOCKET_EVENTS.RECONNECT_ATTEMPT, () => setStatus(initStatusState))

    io.connect()
    return () => {
      setStatus(initStatusState)
      io.disconnect()
    }
  }

  return { status, setupSocketConnection }
}

export const SocketIOProvider = ({ children }: Props) => {
  const wsUrl = useAtomValue(wsUrlAtom)
  const { status, setupSocketConnection } = useSocketSetup(wsUrl)
  const { isConnected, isAuthSuccess, isLoading, isDisconnected, error } = status

  useEffect(setupSocketConnection, [wsUrl])

  if (isConnected && isAuthSuccess) return children
  if (isLoading) return <LoadingView />
  if (isDisconnected || error) return <DisconnectedView errors={error} />

  return null
}

type Props = PropsWithChildren

type StatusState = {
  error: string[]
  isConnected: boolean
  isAuthSuccess: boolean
  isLoading: boolean
  isDisconnected: boolean
}

type AuthStatus = {
  isSuccess: boolean
  reason: string
}