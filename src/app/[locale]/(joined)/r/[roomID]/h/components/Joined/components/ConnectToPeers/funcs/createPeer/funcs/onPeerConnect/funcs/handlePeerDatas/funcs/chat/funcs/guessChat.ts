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

  const painterID = whoIsPainter.painterID

  const guessingTimeLimitMinutes = 4
  const totalCoinBonus = guessingTimeLimitMinutes * 60
  const passedTime =
    useMatchStatus.getState().value.lastMatchStartedAt! - Date.now()
  const currentCoin = parseFloat(
    (totalCoinBonus - passedTime / 1000).toFixed(2),
  )

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
          amount: currentCoin,
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
          amount: currentCoin,
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
        amount: currentCoin,
      },
    },
    {

      event: 'youGuessed',
    },
  ])

  sendToPeerWithID(painterID, {

    event: 'yourCoin',
    data: {
      amount: currentCoin,
    },
  })

  useCoins.getState().add(userID, currentCoin)
  useCoins.getState().add(painterID, currentCoin)
  useGuessedPlayers.getState().guessed(userID)

  const isEveryoneGuessed = usePlayers.getState().value.count - 1 === useGuessedPlayers.getState().playersIDs.length


  if (isEveryoneGuessed) {
    useMatchStatus.getState().clearInterval()
    createMatch(roomID)
    sendToAllPeers({

      event: 'everyoneGuessed',
    })
  }

}
