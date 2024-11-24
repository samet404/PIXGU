import { onPeerData, grayLog, negativeLog } from '@/utils'
import { useHostPeer } from '@/zustand/store'
import {
  getJoinedPlayers,
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
  getPainterEraser,
  getPainterPencil,
  getPainterTrash,
  getPainterBucket,
  getPrevCanvas,
  getYouPurchasedMarketItem,
  getPowerupUsed,
  getYouUsedPowerup,
  getPurchasedMarketItem,
  getPainterEraserOrPencilOut,
  getPainterMouseDown
} from './funcs'

/**
 * This function handles different peer datas.
 */
export const handlePeerDatas = (userID: string) => {
  onPeerData<'fromHost'>(useHostPeer.getState().get()!, (rtcData) => {
    const { event } = rtcData

    grayLog(`RECEIVED ${event} DATA FROM HOST`, rtcData)

    switch (event) {
      case 'painterEraser':
        getPainterEraser(rtcData.data)
        break
      case 'painterPencil':
        getPainterPencil(rtcData.data)
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
      case 'painterTrash':
        getPainterTrash()
        break
      case 'painterBucket':
        getPainterBucket(rtcData.data)
        break
      case 'prevCanvas':
        getPrevCanvas(rtcData.data)
        break
      case 'youPurchasedMarketItem':
        getYouPurchasedMarketItem(rtcData.data)
        break
      case 'powerupUsed':
        getPowerupUsed(rtcData.data)
        break
      case 'youUsedPowerup':
        console.log('you used powerup case')
        getYouUsedPowerup(rtcData.data)
        break
      case 'purchasedMarketItem':
        getPurchasedMarketItem(rtcData.data)
        break
      case 'painterEraserOrPencilOut':
        getPainterEraserOrPencilOut()
        break
      case 'painterMouseDown':
        getPainterMouseDown(rtcData.data)
        break
      default:
        negativeLog('RECEIVED UNKNOWN EVENT FROM HOST', rtcData)
        break
    }
  })
}
