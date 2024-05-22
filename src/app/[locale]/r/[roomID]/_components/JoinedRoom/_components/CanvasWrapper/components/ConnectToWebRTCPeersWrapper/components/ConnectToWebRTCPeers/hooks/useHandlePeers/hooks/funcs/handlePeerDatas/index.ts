import type { WebRTCConnData } from '@/types'
import type SimplePeer from 'simple-peer'
import { decodedOnPeerData } from '@/utils'
import { rtcDrawEvent } from './funcs/rtcDrawEvent'

/**
 * This function handles different peer datas.
 *
 * @param peer - The peer object
 * @param setPlayer - The function to set the player to player section
 */
export const handlePeerDatas = ({ peer, setPlayer }: Args) => {
  decodedOnPeerData(peer, (strData) => {
    const data: WebRTCConnData = JSON.parse(strData)

    if (data.event === 'meet') setPlayer(data.userInfo)
    else if (data.event === 'draw') {
      rtcDrawEvent
    }
  })
}

type Args = {
  peer: SimplePeer.Instance
  setPlayer: any
}
