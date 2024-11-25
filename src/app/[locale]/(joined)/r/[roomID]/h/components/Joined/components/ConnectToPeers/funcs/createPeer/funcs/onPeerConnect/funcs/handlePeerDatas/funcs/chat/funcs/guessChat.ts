import type { GuessChatFromClient } from '@/types/webRTCConnData'
import {
  useCoins,
  useGuessedPlayers,
  useHostPainterData,
  useMatchStatus,
  usePlayers,
  useWhoIsPainter,
} from '@/zustand/store'
import { sendManyToAllPeers, sendManyToPeerWithID, sendToAllPeers, sendToPeerWithID, strSimilarity } from '@/utils'
import { createMatch } from '@/helpers/room'
import { MATCH_TIME_MINUTES } from '@/constants'
import { postMsgToHostTimerWorker } from '@/workers'

export const guessChat = async (
  data: GuessChatFromClient['data'],
  userID: string,
  msgID: number,
  roomID: string
) => {
  const painterData = useHostPainterData.getState().value
  const whoIsPainter = useWhoIsPainter.getState().value
  if (painterData.status !== 'painterSelectedTheme') return
  if (useWhoIsPainter.getState().isPainter(userID)) return

  const theme = painterData.selectedTheme.toLocaleLowerCase().trim().replace(/\s/g, '');
  if (!theme) return
  const receivedTheme = data.msg.toLocaleLowerCase().trim().replace(/\s/g, '');

  sendToAllPeers(
    {

      event: 'guessChat',
      data: {
        from: userID,
        msgID,
        msg: data.msg,
        similarity: strSimilarity(theme, receivedTheme),
      },
    },
    { except: [userID] },
  )

  sendToPeerWithID(userID, {

    event: `yourGuessChat`,
    data: {
      msgID,
      msg: data.msg,
      similarity: strSimilarity(theme, receivedTheme),
    },
  })


  if (theme !== receivedTheme) return
  if (whoIsPainter.status === 'thereIsNoPainter') return

  const painterID = whoIsPainter.painterID!

  const totalCoinBonus = MATCH_TIME_MINUTES * 80
  const passedSeconds = useMatchStatus.getState().value.remainSeconds!
  const currentCoin = parseFloat(((totalCoinBonus - passedSeconds)).toFixed(2))

  useCoins.getState().add(userID, currentCoin)
  useCoins.getState().add(painterID, currentCoin)

  sendManyToAllPeers([
    [
      {

        event: 'guessed',
        data: {
          ID: userID,
        },
      },
      {
        except: [userID],
      },
    ],
    [
      {

        event: 'coin',
        data: {
          to: userID,
          amount: useCoins.getState().coins[userID]!,
        },
      },
      {
        except: [userID],
      },
    ],
    [
      {

        event: 'coin',
        data: {
          to: painterID,
          amount: useCoins.getState().coins[painterID]!,
        },
      },
      {
        except: [painterID],
      },
    ],
  ])

  sendManyToPeerWithID(userID, [
    {

      event: 'yourCoin',
      data: {
        amount: useCoins.getState().coins[userID]!,
      },
    },
    {

      event: 'youGuessed',
    },
  ])

  sendToPeerWithID(painterID, {

    event: 'yourCoin',
    data: {
      amount: useCoins.getState().coins[painterID]!,
    },
  })


  useGuessedPlayers.getState().guessed(userID)

  const isEveryoneGuessed = usePlayers.getState().value.count - 1 === useGuessedPlayers.getState().playersIDs.length


  if (isEveryoneGuessed) {
    postMsgToHostTimerWorker({
      ID: 'MATCH_ENDED',
      event: 'stop',
    })
    postMsgToHostTimerWorker({
      ID: 'MATCH_REMAIN_TIME',
      event: 'stop',
    })
    useMatchStatus.getState().timeoutCancelled()

    createMatch(roomID)
    sendToAllPeers({

      event: 'everyoneGuessed',
    })
  }

}
