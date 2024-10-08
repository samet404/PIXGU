'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRef, type PropsWithChildren } from 'react'
import { io, type Socket } from 'socket.io-client'

const Provider = ({ children }: PropsWithChildren) => {
  const socketRef = useRef<Socket>(
    io('http://localhost:5000/test', {
      autoConnect: true,
      withCredentials: true,
      auth: {
        roomID: 'test',
      },
    }),
  )

  const sendWhatever = () => {
    socketRef.current.emit('test', { test: 'test' })
  }
  socketRef.current.on('receive-whatever', (data) => {
    console.log('Received: ', data)
  })

  useEffectOnce(() => {
    console.log(socketRef.current)

    socketRef.current.on('connect', () => {
      console.log('connected')
    })

    socketRef.current.on('disconnect', () => {
      console.log('disconnected')
    })

    socketRef.current.on('connect_error', (err) => {
      console.error(err)
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

    return () => {
      socketRef.current.disconnect()
    }
  })

  return (
    <div>
      <button
        onMouseDown={() => socketRef.current.emit('login')}
        className="bg-orange-400"
      >
        login
      </button>
      <button onMouseDown={sendWhatever} className="bg-emerald-400">
        Send
      </button>
      <button onMouseDown={sendWhatever} className="bg-blue-500">
        a
      </button>
      <button
        className="bg-green-400"
        onMouseDown={() => socketRef.current.connect()}
      >
        connect
      </button>
      {children}
    </div>
  )
}

export default Provider
