import { onPeerData, grayLog, negativeLog } from '@/utils'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import {
  getJoinedPlayers,
  getLeftPlayers,
  getPainter,
  getGuessChat,
  getGeneralChat,
  getYourGeneralChat,
  getYourGuessChat,
  getPainterSelectedTheme,
  getPainterSelectingTheme,
  getCoin,
  getPrevPlayers,
  getMyCoin,
  getGuessed,
  getYouGuessed,
  getThemes,
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
  getPowerupUsed,
  getPainterEraserOrPencilOut,
  getPainterMouseDown,
  getPainterSelectedThemeTimeIsUp,
  getGameLog,
  getUndoRedo,
  getYouUsedPowerup,
  getYourPowerupTimeIsUp,
  getPowerupTimeIsUp,
  getYouLosedAsGuessr,
  getLosedAsGuessr
} from './funcs'

export const handlePeerDatas = (myUserID: string) => {
  const secretKey = useHostPeer.getState().secretKey

  if (!secretKey) {
    console.error('no secret key')
    return
  }

  onPeerData<'fromHost'>(useHostPeer.getState().get()!, secretKey, (rtcData) => {
    const { event } = rtcData

    grayLog(`RECEIVED ${event} DATA FROM HOST`, rtcData)

    switch (event) {
      case 'painterEraser':
        getPainterEraser(rtcData.data)
        break
      case 'painterPencil':
        getPainterPencil(rtcData.data)
        break
      case 'painterSelectedThemeTimeIsUp':
        getPainterSelectedThemeTimeIsUp()
        break
      case 'painterSelectedTheme':
        getPainterSelectedTheme()
        break
      case 'painterSelectingTheme':
        getPainterSelectingTheme()
        break
      case 'currentPainter':
        getPainter(rtcData.data, myUserID)
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
      case 'generalChat':
        getGeneralChat(rtcData.data)
        break
      case 'yourGeneralChat':
        getYourGeneralChat(rtcData.data)
        break
      case 'yourGuessChat':
        getYourGuessChat(rtcData.data)
        break
      case 'prevPlayers':
        getPrevPlayers(rtcData.data, myUserID)
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
      case 'powerupUsed':
        getPowerupUsed(rtcData.data)
        break
      case 'youUsedPowerup':
        getYouUsedPowerup(rtcData.data, myUserID)
        break
      case 'painterEraserOrPencilOut':
        getPainterEraserOrPencilOut()
        break
      case 'painterMouseDown':
        getPainterMouseDown(rtcData.data)
        break
      case 'gameLog':
        getGameLog(rtcData.data)
        break
      case 'undoRedo':
        getUndoRedo(rtcData.data)
        break
      case 'yourPowerupTimeIsUp':
        getYourPowerupTimeIsUp(rtcData.data)
        break
      case 'powerupTimeIsUp':
        getPowerupTimeIsUp(rtcData.data)
        break
      case 'youLosedAsGuesser':
        getYouLosedAsGuessr()
        break
      case 'losedAsGuesser':
        getLosedAsGuessr(rtcData.data)
        break
      default:
        negativeLog('RECEIVED UNKNOWN EVENT FROM HOST', rtcData)
        break
    }
  })
}
