'use client'

import { useRoomIDStore } from '@/zustand/provider'
import { categoryHint, changeThemes, getSecretKey, playerJoined, randomThemes, receiveSignal } from './funcs'
import { useHostingHealth } from '@/zustand/store/useHostingHealth'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { useEffect, } from 'react'
import { playerLeftFromSocket } from './funcs/playerLeftFromSocket'
import type { Locale } from '@/types/locale'

export const ConnectToPeers = ({ locale }: { locale: Locale }) => {
  const setHostingHealth = useHostingHealth.getState().set
  const roomID = useRoomIDStore((s) => s.roomID)
  const io = useSocketIO((s) => s.io)

  useEffect(() => {
    if (!io) return

    io.on('connect', () => {
      setHostingHealth('waitingForPlayers')
    })

    changeThemes(io)
    categoryHint(io)
    randomThemes(io, locale)
    getSecretKey(io)
    receiveSignal(io)

    playerLeftFromSocket(io, roomID, locale)
    playerJoined(io, roomID, locale)

    useSocketIO.getState().io!.emit('ready')
  }, [])

  return null
}
