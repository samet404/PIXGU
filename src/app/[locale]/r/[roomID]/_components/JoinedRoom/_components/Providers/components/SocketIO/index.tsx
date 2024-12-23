'use client'

import { useSocketIO } from '@/zustand/store'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { io as IOClient, type ManagerOptions, type Socket, type SocketOptions } from 'socket.io-client'
import { env } from '@/env/client'
import { useAtom } from 'jotai'
import { roomPasswordAtom } from '../../atoms'
import { DisconnectedView } from './components/DisconnectedView'
import { LoadingView } from './components/LoadingView'

const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  AUTH: 'auth',
  PLAYER_AUTH: 'player-auth',
  ROOM_KILLED: 'room_killed',
  BLOCKED: 'blocked',
  LEAVE_ROOM: 'leave-room',
  CONNECT_ERROR: 'connect_error',
  RECONNECT_ERROR: 'reconnect_error',
  RECONNECT_ATTEMPT: 'reconnect_attempt',
} as const

const NAMESPACE = 'p'

const initStatusState: StatusState = {
  error: [],
  isAuthSuccess: false,
  isPlayerAuthSuccess: false,
  isLoading: true,
  isConnected: false,
  isDisconnected: false,
}

const createSocketConnection = (opts: Partial<ManagerOptions & SocketOptions>) =>
  IOClient(`${env.NEXT_PUBLIC_SOCKETIO_URI}/${NAMESPACE}`, {
    autoConnect: false,
    withCredentials: true,
    secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
    ...opts,
  })

const useSocketSetup = (roomID: string) => {
  const [password, setPassword] = useAtom(roomPasswordAtom)
  const [status, setStatus] = useState<StatusState>(initStatusState)
  const io = useSocketIO(s => s.io)
  const [ioOpts] = useState<Partial<ManagerOptions & SocketOptions>>({
    auth: { roomID, password },
  })

  const handleAuth = (io: Socket, authStatus: AuthStatus) => {
    if (authStatus.isSuccess) {
      setStatus(prev => ({ ...prev, isAuthSuccess: true }))
      io.emit(SOCKET_EVENTS.PLAYER_AUTH)
    } else {
      setStatus(prev => ({
        ...prev,
        isAuthSuccess: false,
        error: [...prev.error, `UNAUTHORIZED: You need to be ${authStatus.required.join(' or ')}`],
      }))
    }
  }

  const handlePlayerAuth = (authStatus: PlayerAuthStatus) => {
    if (authStatus.isSuccess) {
      setStatus(prev => ({ ...prev, isPlayerAuthSuccess: true }))
    } else {
      setStatus(prev => ({
        ...prev,
        isLoading: false,
        isConnected: false,
        error: [...prev.error, authStatus.reason.code],
      }))
    }
  }

  const setupSocketListeners = () => {
    if (!io) return

    io.on(SOCKET_EVENTS.CONNECT, () => {
      setStatus(prev => ({ ...prev, isConnected: true }))
      io.emit(SOCKET_EVENTS.AUTH)
    })

    io.once(SOCKET_EVENTS.AUTH, (authStatus: AuthStatus) => handleAuth(io, authStatus))
    io.once(SOCKET_EVENTS.PLAYER_AUTH, handlePlayerAuth)

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
        error: [...prev.error, `ROOM_KILLED: ${reason}`],
      }))
    })

    io.on(SOCKET_EVENTS.BLOCKED, () => {
      setStatus(prev => ({
        ...prev,
        error: [...prev.error, 'BLOCKED: You are blocked from room by host'],
      }))
    })

    io.on(SOCKET_EVENTS.LEAVE_ROOM, (reason) => {
      setStatus(prev => ({
        ...prev,
        error: [...prev.error, `LEAVE_ROOM: ${reason}`],
      }))
    })

    if (!ioOpts.autoConnect) io.connect()

    return () => {
      setStatus(initStatusState)
      if (io) io.disconnect()
    }
  }

  return {
    status,
    setupSocketListeners,
    password,
    setPassword,
    ioOpts,
  }
}

export const SocketIOProvider = ({ roomID, children }: Props) => {
  const {
    status,
    setupSocketListeners,
    password,
    setPassword,
    ioOpts,
  } = useSocketSetup(roomID)

  const { isConnected, isPlayerAuthSuccess, isAuthSuccess, isLoading, isDisconnected, error } = status

  useEffect(() => {
    useSocketIO.getState().setIO(createSocketConnection(ioOpts))
  }, [ioOpts])

  useEffect(setupSocketListeners, [useSocketIO(s => s.io)])

  if (isConnected && isPlayerAuthSuccess && isAuthSuccess) return children
  if (isLoading) return <LoadingView />
  if (isDisconnected || error) {
    return (
      <DisconnectedView
        errors={error}
        password={password}
        onPasswordReset={() => setPassword(null)}
      />
    )
  }

  return null
}

type Props = PropsWithChildren<{
  roomID: string
}>

type PlayerAuthStatus =
  | {
    isSuccess: true
  }
  | {
    isSuccess: false
    reason: {
      code: string
      message: string
    }
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
  isPlayerAuthSuccess: boolean
  isLoading: boolean
  isDisconnected: boolean
}
