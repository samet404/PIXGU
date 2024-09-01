import type { GuessChatFromClient } from '@/types/webRTCConnData'

export const guessChat = async (
  data: GuessChatFromClient['data'],
  userID: string,
) => {
  const { useHostPainterData } = await import('@/zustand/store')
  const painterData = useHostPainterData.getState().value

  if (
    painterData.status === 'painterSelectedTheme' &&
    painterData.selectedTheme?.toLocaleLowerCase() ===
      data.msg.toLocaleLowerCase()
  ) {
    const { sendManyToAllPeers, sendManyToPeerWithID } = await import('@/utils')

    sendManyToAllPeers([
      [
        {
          from: 'host',
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
          from: 'host',
          event: 'coin',
          data: {
            to: userID,
            amount: 10,
          },
        },
        {
          except: [userID],
        },
      ],
    ])

    sendManyToPeerWithID(userID, [
      {
        from: 'host',
        event: 'yourCoin',
        data: {
          amount: 10,
        },
      },
      {
        from: 'host',
        event: 'youGuessed',
      },
    ])
  }
}
