import type { User } from 'lucia'
import { filterObj } from '@/utils/filterObj'
import { create } from 'zustand'
import { goldLog } from '@/utils/goldLog'

export type Player = (
  | {
      isPainter: false
      isGuessed: boolean
    }
  | {
      isPainter: true
    }
) & {
  coin: number
} & User

type Players = {
  players: Record<string, Player>
  playersArrWithDBInfo: (Player & User)[]
  playersDbInfos: Record<string, User>
  count: number
}

type State = { value: Players }

type Action = {
  mutate: (input: Partial<Players>) => void
  addPlayer: (userID: string, player: Player) => void
  changePlayer: (userID: string, player: Partial<Player>) => void
  removePlayer: (userID: string) => void
  resetAndSetPlayers: (
    input: {
      userID: string
      player: Player
    }[],
  ) => void
  getPlayersIDs: () => string[]
  getPlayer: (userID: string) => Player | null
  getPlayersDbInfos: () => Record<
    string,
    {
      usernameWithUsernameID: string
      profilePicture: string | null
    }
  >
  getPlayersDbInfosArr: () => {
    ID: string
    usernameWithUsernameID: string
    profilePicture: string | null
  }[]

  get: () => Players
  reset: () => void
}

const initValue: State = {
  value: {
    players: {},
    playersDbInfos: {},
    playersArrWithDBInfo: [],
    count: 0,
  },
} as const

export const usePlayers = create<State & Action>((set, get) => ({
  ...initValue,

  mutate: (input) => {
    set({
      value: {
        ...get().value,
        ...input,
      },
    })
  },
  resetAndSetPlayers: (input) => {
    get().value.players = {}

    for (const item of input) {
      const { userID, player } = item
      get().addPlayer(userID, player)
    }
  },
  removePlayer: (userID: string) => {
    if (!get().value.players[userID]) return

    set({
      value: {
        ...get().value,

        count: get().value.count - 1,
        players: filterObj(
          get().value.players,
          ([k, v]) => k !== userID,
        ) as Record<string, Player>,

        playersDbInfos: filterObj(
          get().value.playersDbInfos,
          ([k, v]) => k !== userID,
        ) as Record<string, User>,

        playersArrWithDBInfo: get().value.playersArrWithDBInfo.filter(
          (player) => player.id !== userID,
        ),
      },
    })
  },
  changePlayer: (userID: string, player: Partial<Player>) => {
    set({
      value: {
        ...get().value,
        players: {
          ...get().value.players,
          [userID]: {
            ...get().value.players[userID],
            ...player,
          },
        } as Record<string, Player>,
      },
    })
  },
  getPlayer: (userID: string) => get().value.players[userID] ?? null,
  addPlayer: (userID, player) => {
    const { profilePicture, id, username, usernameID, usernameWithUsernameID } =
      player
    const next: State = {
      value: {
        ...get().value,
        count: get().value.count + 1,
        players: {
          ...get().value.players,
          [userID]: player,
        },

        playersArrWithDBInfo: [
          ...get().value.playersArrWithDBInfo,
          {
            coin: 0,
            isGuessed: false,
            isPainter: false,
            profilePicture,
            id,
            username,
            usernameID,
            usernameWithUsernameID,
          },
        ],

        playersDbInfos: {
          ...get().value.playersDbInfos,
          [userID]: {
            profilePicture,
            id,
            username,
            usernameID,
            usernameWithUsernameID,
          },
        },
      },
    }

    set(next)
  },
  getPlayersDbInfos: () => get().value.playersDbInfos,
  getPlayersDbInfosArr: () =>
    Object.entries(get().value.playersDbInfos).map(([ID, player]) => ({
      ID,
      ...player,
    })),
  getPlayersIDs: () => Object.keys(get().value.players),
  get: () => get().value,
  reset: () => {
    set({
      ...initValue,
    })
  },
}))
