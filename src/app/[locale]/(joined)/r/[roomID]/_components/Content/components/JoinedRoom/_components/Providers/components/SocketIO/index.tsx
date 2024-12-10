'use client'

import Spinner from '@/components/Spinner'
import { useSocketIO } from '@/zustand/store'
import { useEffect, useRef, useState, type PropsWithChildren } from 'react'
import { io as IOClient, type ManagerOptions, type SocketOptions } from 'socket.io-client'
import { Outfit } from 'next/font/google'
import { env } from '@/env/client'
import BackButton from '@/components/BackButton'
import ToHomeButton from '@/components/ToHomeButton'
import Link from 'next/link'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useAtom } from 'jotai'
import { roomPasswordAtom } from '../../atoms'
import { TryAgainBtn } from './components/TryAgainBtn'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700'],
})

const initStatusState: StatusState = {
  error: [],
  isAuthSuccess: false,
  isPlayerAuthSuccess: false,
  isLoading: true,
  isConnected: false,
  isDisconnected: false,
}
const NAMESPACE = 'p'
const getIO = (opts: Partial<ManagerOptions & SocketOptions>) => IOClient(`${env.NEXT_PUBLIC_SOCKETIO_URI}/${NAMESPACE}`, {
  autoConnect: false,
  withCredentials: true,
  secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
  ...opts,
})

/**
 * SocketIOProvider is a provider that handles socket.io connection.
 */
export const SocketIOProvider = ({ roomID, children }: Props) => {
  const [password, setPassword] = useAtom(roomPasswordAtom)
  const [status, setStatus] = useState<StatusState>(initStatusState)
  const io = useSocketIO(s => s.io)
  const [ioOpts, setIoOpts] = useState<Partial<ManagerOptions & SocketOptions>>({

    auth: {
      roomID,
      password
    },
  })
  const {
    error,
    isConnected,
    isLoading,
    isAuthSuccess,
    isDisconnected,
    isPlayerAuthSuccess,
  } = status

  useEffect(() => {
    useSocketIO.getState().setIO(getIO(ioOpts))
  }, [ioOpts])

  useEffect(() => {
    if (!io) return

    io.on('connect', () => {
      console.log('connected')
      setStatus((prev) => {
        return {
          ...prev,
          isConnected: true,
        }
      })
      useSocketIO.getState().io!.emit('auth')
    })

    io.once('auth', (authStatus: AuthStatus) => {
      if (authStatus.isSuccess) {
        setStatus((prev) => {
          return {
            ...prev,
            isAuthSuccess: true,
          }
        })
        io.emit('player-auth')
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
      .io!.once('player-auth', (authStatus: PlayerAuthStatus) => {
        console.log('player-auth: ', authStatus)
        if (authStatus.isSuccess) {
          setStatus((prev) => {
            return {
              ...prev,
              isPlayerAuthSuccess: true,
            }
          })
        } else {
          setStatus((prev) => {
            return {
              ...prev,
              isLoading: false,
              isConnected: false,
              error: [...prev.error, authStatus.reason.code],
            }
          })
        }
      })

    io.on('disconnect', () => {
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

    io.on('connect_error', (err) => {
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

    io.on('reconnect_error', (e) => {
      console.error(e)
      setStatus((prev) => {
        return {
          ...initStatusState,
          isConnected: false,
          error: [e.message],
        }
      })
    })

    io.on('reconnect_attempt', (e) => {
      console.log('reconnecting')
      setStatus(initStatusState)
    })

    io.on('room_killed', ({ reason }) => {
      console.log('room killed')
      setStatus((prev) => {
        return {
          ...prev,
          error: [
            ...prev.error,
            `ROOM_KILLED: ${reason}`,
          ],
        }
      })
    })

    io.on('blocked', () => {
      console.log('blocked')
      setStatus((prev) => {
        return {
          ...prev,
          error: [
            ...prev.error,
            `BLOCKED: You are blocked from room by host`,
          ],
        }
      })
    })

    if (!ioOpts.autoConnect) io.connect()

    return () => {
      setStatus({ ...initStatusState })
      if (io) io.disconnect()
    }
  }, [io])


  if (isConnected && isPlayerAuthSuccess && isAuthSuccess) return children
  if (isLoading) return <div className="font-[700] w-full gap-3 h-full text-white items-center justify-center flex flex-col">
    <div>Connecting to server</div>  <Spinner />
  </div>

  if (isDisconnected || error) {
    const errors = error.join(' | ')
    return (
      <div
        className={`${outfit.className} animate-fade selection:!bg-rose-600 bg-gradient-to-tr from-rose-500 to-rose-400 flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg text-white`}
      >
        <div className='flex flex-col gap-1 items-center'>
          <div className="font-[700] text-[2.6rem]">
            {'Disconnected from server'}
          </div>
          <div className="text-[#ffffffcc] flex flex-row gap-1">
            <div className='text-white'>ERROR CODES: </div>
            <div>{errors === '' ? 'REASON UNKNOWN' : errors}</div>
          </div>
        </div>
        <div className='flex flex-col gap-1 items-center'>

          <div className="flex flex-row gap-4 pt-3">
            <BackButton className="rounded-md bg-[#ffffff2b] px-2 py-1">
              Back
            </BackButton>
            <ToHomeButton className="rounded-md bg-[#ffffff2b] px-2 py-1">
              Home
            </ToHomeButton>
            <Link href='/join' className="rounded-md bg-[#ffffff2b] px-2 py-1">
              Go to active rooms
            </Link>

            <TryAgainBtn tryAgain={() => {
              setStatus({ ...initStatusState })
              setIoOpts({ ...ioOpts })
            }} />

            {
              password && <button onMouseDown={() => {
                setPassword(null)
              }} className='rounded-md bg-[#ffffff2b] px-2 py-1'>
                Try different password?
              </button>}
          </div>
        </div>
      </div >
    )
  }
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
