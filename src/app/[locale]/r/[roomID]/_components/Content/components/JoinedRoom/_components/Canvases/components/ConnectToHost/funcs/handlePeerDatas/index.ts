import { decodedOnPeerData, grayLog, negativeLog } from '@/utils'
import { useHostPeer } from '@/zustand/store'
import {
  getJoinedPlayers,
  getPainterDraw,
  getLeftPlayers,
  getPainter,
  getGuessChat,
  getWinnersChat,
  getYourWinnersChat,
  getYourGuessChat,
  getPainterCouldNotSelectTheme,
  getPainterSelectedTheme,
  getPainterSelectingTheme,
  getCoin,
  getPrevPlayers,
  getPong,
  getMyCoin,
  getGuessed,
  getYouGuessed,
  getThemes,
  youAreSpectator,
  getSpectator,
  gameIsStopped,
  getPrevSpectators,
  getEveryoneGuessed,
  gameEnded,
  getPrevCoins,
  getPrevPainterDraw,
} from './funcs'

/**
 * This function handles different peer datas.
 */
export const handlePeerDatas = (userID: string) => {
  decodedOnPeerData<'fromHost'>(useHostPeer.getState().get()!, (rtcData) => {
    const { from, event } = rtcData
    if (from !== 'host') return

    grayLog(`RECEIVED ${event} DATA FROM HOST`, rtcData)

    switch (event) {
      case 'painterDraw':
        getPainterDraw(rtcData.data)
        break
      case 'painterCouldNotSelectTheme':
        getPainterCouldNotSelectTheme(rtcData.data, userID)
        break
      case 'painterSelectedTheme':
        getPainterSelectedTheme()
        break
      case 'painterSelectingTheme':
        getPainterSelectingTheme()
        break
      case 'currentPainter':
        getPainter(rtcData.data, userID)
        break
      case 'playerLeft':
        getLeftPlayers(rtcData.data)
        break
      case 'playerJoined':
        getJoinedPlayers(rtcData.data)
        break
      case 'guessChat':
        getGuessChat(rtcData.data)
        break
      case 'winnersChat':
        getWinnersChat(rtcData.data)
        break
      case 'yourWinnersChat':
        getYourWinnersChat(rtcData.data)
        break
      case 'yourGuessChat':
        getYourGuessChat(rtcData.data)
        break
      case 'prevPlayers':
        getPrevPlayers(rtcData.data, userID)
        break
      case 'pong':
        getPong(rtcData.data)
        break
      case 'guessed':
        getGuessed(rtcData.data)
        break
      case 'coin':
        getCoin(rtcData.data)
        break
      case 'yourCoin':
        getMyCoin(rtcData.data)
        break
      case 'youGuessed':
        getYouGuessed()
        break
      case 'selectTheme':
        getThemes(rtcData.data)
        break
      case 'youAreSpectator':
        youAreSpectator()
        break
      case 'spectator':
        getSpectator(rtcData.data)
        break
      case 'gameIsStopped':
        gameIsStopped()
        break
      case 'prevSpectators':
        getPrevSpectators(rtcData.data)
        break
      case 'everyoneGuessed':
        getEveryoneGuessed()
        break
      case 'gameEnded':
        gameEnded(rtcData.data)
        break
      case 'prevCoins':
        getPrevCoins(rtcData.data)
        break
      case 'prevPainterDraw':
        getPrevPainterDraw(rtcData.data)
        break
      default:
        negativeLog('RECEIVED NOT UNKNOWN EVENT FROM HOST', rtcData)
        break
    }
  })
}
