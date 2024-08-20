import type { WebRTCConnData } from '@/types'
import { usePlayers } from '@/zustand/store'
import { useMyCoin } from '@/zustand/store/useMyCoin'

export const getPrevPlayers = (rtcData: WebRTCConnData, userID: string) => {
  const { event, from } = rtcData
  if (event !== 'prevPlayers' || from !== 'host') return null

  const addPlayer = usePlayers.getState().addPlayer
  const setMyCoin = useMyCoin.getState().set

  const data = rtcData.data
  Object.keys(data).forEach((key) => {
    if (key === userID) return
    addPlayer(key, data[key]!)
  })
}
