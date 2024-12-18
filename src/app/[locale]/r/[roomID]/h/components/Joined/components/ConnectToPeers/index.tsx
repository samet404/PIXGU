'use client'

import { useRoomIDStore } from '@/zustand/provider'
import { getPrevPlayers, playerJoined, receiveSignal } from './funcs'
import { useHostingHealth, useSocketIO } from '@/zustand/store'
import { useEffect, } from 'react'
import { playerLeftFromSocket } from './funcs/playerLeftFromSocket'

export const ConnectToPeers = () => {
  const setHostingHealth = useHostingHealth.getState().set
  const roomID = useRoomIDStore((s) => s.roomID)
  const io = useSocketIO((s) => s.io)

  useEffect(() => {
    if (!io) return

    io.on('connect', () => {
      setHostingHealth('waitingForPlayers')
    })
    receiveSignal()
    playerLeftFromSocket(roomID)
    playerJoined(roomID)
    getPrevPlayers(roomID)

    useSocketIO.getState().io!.emit('ready')
  }, [])

  return null
}
