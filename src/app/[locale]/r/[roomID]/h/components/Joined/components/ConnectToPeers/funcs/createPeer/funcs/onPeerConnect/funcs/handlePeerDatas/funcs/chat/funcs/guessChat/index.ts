import { calculateCurrentCoin, matchEnd, sendMsg, isMatchEnd, sendOtherInfo } from './funcs'
import { sendToAllPeers, sendToPeerWithID, strSimilarity } from '@/utils'
import type { GuessChatFromClient } from '@/types/webRTCConnData'
import type { Locale } from '@/types/locale'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'
import { useHostPlayersMsgs } from '@/zustand/store/useHostPlayersMsgs'
import { useLoserPlayers } from '@/zustand/store/useLoserPlayers'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { usePlayersWhoGaveUp } from '@/zustand/store/usePlayersWhoGaveUp'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'
import { sendCoinInfo } from '@/helpers/room'

export const guessChat = (
  data: GuessChatFromClient['data'],
  userID: string,
  msgID: number,
  locale: Locale
) => {
  const painterData = useHostPainterData.getState().value
  const whoIsPainter = useWhoIsPainter.getState().value
  if (
    painterData.status !== 'painterSelectedTheme' ||
    useWhoIsPainter.getState().isPainter(userID) ||
    usePlayersWhoGaveUp.getState().isGaveUp(userID) ||
    useLoserPlayers.getState().isLoser(userID)
  ) return

  const theme = painterData.selectedTheme.toLocaleUpperCase().trim().replace(/\s/g, '');
  if (!theme) return

  const receivedTheme = data.msg.toLocaleUpperCase().trim().replace(/\s/g, '');
  const similarity = strSimilarity(theme, receivedTheme)

  sendMsg(msgID, data.msg, userID, similarity)

  if (theme !== receivedTheme) {
    const guessCount = useHostPlayersMsgs.getState().guessChatMsgCounts[userID]
    if (guessCount === 10) {
      useLoserPlayers.getState().add(userID)
      sendToPeerWithID(userID, {
        event: 'youLosedAsGuesser',
      })

      sendToAllPeers({
        event: 'losedAsGuesser',
        data: {
          userID
        }
      }, {
        except: [userID]
      })

      useCoins.getState().decrease(userID, 100)
      sendCoinInfo([userID])
    }

    if (isMatchEnd()) matchEnd(locale)
    return
  }

  useHostPlayersMsgs.getState().resetGuessChatMsgCountsOfUser(userID)

  const painterID = whoIsPainter.painterID!
  const currentCoin = calculateCurrentCoin()

  sendOtherInfo(userID, currentCoin, painterID)

  useGuessedPlayers.getState().guessed(userID)
  usePlayersPowerups.getState().setWinnersPowerups(userID)

  if (!isMatchEnd()) return

  matchEnd(locale)
}
