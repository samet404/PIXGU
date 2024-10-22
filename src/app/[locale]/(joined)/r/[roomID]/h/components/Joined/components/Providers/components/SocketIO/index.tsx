'use client'

import Spinner from '@/components/Spinner'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { clsxMerge } from '@/utils/clsxMerge'
import { useSocketIO } from '@/zustand/store'
import { Fragment, useState, type PropsWithChildren } from 'react'
import { io, type ManagerOptions, type SocketOptions } from 'socket.io-client'
import { Outfit } from 'next/font/google'
import { env } from '@/env/client'
import BackButton from '@/components/BackButton'
import ToHomeButton from '@/components/ToHomeButton'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700'],
})

/**
 * SocketIOProvider is a provider that handles socket.io connection.
 */
export const SocketIOProvider = ({ roomID, children }: Props) => {
  const NAMESPACE = 'h'
  const OPTS: Partial<ManagerOptions & SocketOptions> = {
    auth: {
      roomID,
    },
  }

  const initStatusState: StatusState = {
    error: [],
    isAuthSuccess: false,
    isHostAuthSuccess: false,
    isLoading: true,
    isConnected: false,
    isDisconnected: false,
  }

  const [status, setStatus] = useState<StatusState>(initStatusState)
  const {
    error,
    isConnected,
    isLoading,
    isAuthSuccess,
    isDisconnected,
    isHostAuthSuccess,
  } = status
  const setIO = useSocketIO((s) => s.setIO)
  console.log(status)
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
      setStatus((prev) => {
        return {
          ...prev,
          isConnected: true,
        }
      })
      useSocketIO.getState().io!.emit('auth')
    })

    useSocketIO.getState().io!.once('auth', (authStatus: AuthStatus) => {
      if (authStatus.isSuccess) {
        setStatus((prev) => {
          return {
            ...prev,
            isAuthSuccess: true,
          }
        })
        useSocketIO.getState().io!.emit('host-auth')
      }
      if (!authStatus.isSuccess) {
        console.log('auth is not successed')
        setStatus((prev) => {
          return {
            ...prev,
            isAuthSuccess: false,
            error: [
              ...prev.error,
              `UNAUTHORIZED: You need to be ${authStatus.required.join(' or ')}`,
            ],
          }
        })
      }
    })

    useSocketIO
      .getState()
      .io!.once('host-auth', (authStatus: HostAuthStatus) => {
        console.log('host-auth: ', authStatus)
        if (authStatus.isSuccess) {
          setStatus((prev) => {
            return {
              ...prev,
              isHostAuthSuccess: true,
            }
          })
        } else {
          setStatus((prev) => {
            return {
              ...prev,
              isLoading: false,
              isConnected: false,
              error: [...prev.error, authStatus.reason],
            }
          })
        }
      })

    useSocketIO.getState().io!.on('disconnect', () => {
      console.log('disconnected')
      console.log('disconnected status: ', status)

      setStatus((prev) => {
        return {
          ...prev,
          isLoading: false,
          isConnected: false,
          isDisconnected: true,
        }
      })
    })

    useSocketIO.getState().io!.on('connect_error', (err) => {
      console.error(err)
      setStatus((prev) => {
        return {
          ...initStatusState,
          isLoading: false,
          isConnected: false,
          error: [err.message],
        }
      })
    })

    useSocketIO.getState().io!.on('reconnect_error', (e) => {
      console.error(e)
      setStatus((prev) => {
        return {
          ...initStatusState,
          isConnected: false,
          error: [e.message],
        }
      })
    })

    useSocketIO.getState().io!.on('reconnect_attempt', (e) => {
      console.log('reconnecting')
      setStatus(initStatusState)
    })

    if (!OPTS?.autoConnect) useSocketIO.getState().io!.connect()
    return () => {
      setStatus(initStatusState)
      useSocketIO.getState().io!.disconnect()
    }
  })

  if (isConnected && isHostAuthSuccess && isAuthSuccess) return children
  return (
    <div
      className={clsxMerge(
        `${outfit.className} flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg text-white`,
        {
          'animate-animate-err-pulse-shadow bg-gradient-to-tr from-rose-500 to-rose-400':
            error.length > 0,
        },
      )}
    >
      <div className="font-[700]">
        {error.length > 0 && 'Error at socket connection'}
        {isLoading && 'Connecting to socket server'}
      </div>
      {error.length > 0 && (
        <Fragment>
          <div className="text-[#ffffffcc]">{error.join(' | ')}</div>
          <div className="flex flex-row gap-4 pt-3">
            <BackButton className="rounded-md bg-[#ffffff2b] px-2 py-1">
              Back
            </BackButton>
            <ToHomeButton className="rounded-md bg-[#ffffff2b] px-2 py-1">
              Home
            </ToHomeButton>
          </div>
        </Fragment>
      )}
      {isLoading && <Spinner />}
    </div>
  )
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
