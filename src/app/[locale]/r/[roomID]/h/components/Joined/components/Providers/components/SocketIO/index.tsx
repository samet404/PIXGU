'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useSocketIO } from '@/zustand/store'
import { useState, type PropsWithChildren } from 'react'
import { io as createIO, type ManagerOptions, type Socket, type SocketOptions } from 'socket.io-client'
import { env } from '@/env/client'
import { DisconnectedView } from './components/DisconnectedView'
import { LoadingView } from './components/LoadingView'

const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  AUTH: 'auth',
  HOST_AUTH: 'host-auth',
  ROOM_KILLED: 'room_killed',
  LEAVE_ROOM: 'leave-room',
  CONNECT_ERROR: 'connect_error',
  RECONNECT_ERROR: 'reconnect_error',
  RECONNECT_ATTEMPT: 'reconnect_attempt',
} as const

const useSocketSetup = (roomID: string) => {
  const initStatusState: StatusState = {
    error: [],
    isAuthSuccess: false,
    isHostAuthSuccess: false,
    isLoading: true,
    isConnected: false,
    isDisconnected: false,
  }

  const [status, setStatus] = useState<StatusState>(initStatusState)
  const setIO = useSocketIO((s) => s.setIO)

  const handleAuth = (io: Socket, authStatus: AuthStatus) => {
    if (authStatus.isSuccess) {
      setStatus(prev => ({ ...prev, isAuthSuccess: true }))
      io.emit(SOCKET_EVENTS.HOST_AUTH)
    } else {
      setStatus(prev => ({
        ...prev,
        isAuthSuccess: false,
        error: [...prev.error, `You need to be ${authStatus.required.join(' or ')}`],
      }))
    }
  }

  const handleHostAuth = (authStatus: HostAuthStatus) => {
    if (authStatus.isSuccess) {
      setStatus(prev => ({ ...prev, isHostAuthSuccess: true }))
    } else {
      setStatus(prev => ({
        ...prev,
        isLoading: false,
        isConnected: false,
        error: [...prev.error, authStatus.reason],
      }))
    }
  }

  const setupSocketConnection = () => {
    const NAMESPACE = 'h'
    const OPTS: Partial<ManagerOptions & SocketOptions> = {
      auth: { roomID },
      autoConnect: false,
      withCredentials: true,
      secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
    }

    setIO(createIO(`${env.NEXT_PUBLIC_SOCKETIO_URI}/${NAMESPACE}`, OPTS))
    const io = useSocketIO.getState().io!

    io.on(SOCKET_EVENTS.CONNECT, () => {
      setStatus(prev => ({ ...prev, isConnected: true }))
      io.emit(SOCKET_EVENTS.AUTH)
    })

    io.once(SOCKET_EVENTS.AUTH, (authStatus: AuthStatus) => handleAuth(io, authStatus))
    io.once(SOCKET_EVENTS.HOST_AUTH, handleHostAuth)

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

    io.on(SOCKET_EVENTS.ROOM_KILLED, ({ reason }) => {
      setStatus(prev => ({
        ...prev,
        error: [...prev.error, `ROOM_KILLED BECAUSE ${reason}`],
      }))
    })

    io.on(SOCKET_EVENTS.LEAVE_ROOM, (reason) => {
      setStatus(prev => ({
        ...prev,
        error: [...prev.error, `LEAVE_ROOM: ${reason}`],
      }))
    })

    io.connect()
    return () => {
      setStatus(initStatusState)
      io.disconnect()
    }
  }

  return { status, setupSocketConnection }
}

export const SocketIOProvider = ({ roomID, children }: Props) => {
  const { status, setupSocketConnection } = useSocketSetup(roomID)
  const { isConnected, isHostAuthSuccess, isAuthSuccess, isLoading, isDisconnected, error } = status

  useEffectOnce(setupSocketConnection)

  if (isConnected && isHostAuthSuccess && isAuthSuccess) return children
  if (isLoading) return <LoadingView />
  if (isDisconnected || error) return <DisconnectedView errors={error} />

  return null
}

type Props = PropsWithChildren<{
  roomID: string
}>

type HostAuthStatus =
  | {
    isSuccess: true
  }
  | {
    isSuccess: false
    reason: string
  }

type AuthStatus =
  | {
    isSuccess: true
    as: string
  }
  | {
    isSuccess: false
    required: string[]
  }

type StatusState = {
  error: string[]
  isConnected: boolean
  isAuthSuccess: boolean
  isHostAuthSuccess: boolean
  isLoading: boolean
  isDisconnected: boolean
}
