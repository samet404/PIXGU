import type { User } from 'lucia'
import { filterObj } from '@/utils/filterObj'
import { create } from 'zustand'

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
  playersDbInfos: Record<string, User>
  count: number
}

type State = { value: Players }

type Action = {
  mutate: (input: Partial<Players>) => void
  mutateAndRender: (input: Partial<Players>) => void
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
}

export const usePlayers = create<State & Action>((set, get) => ({
  value: {
    players: {},
    playersDbInfos: {},
    count: 0,
  },

  mutate: (input) => {
    get().value = {
      ...get().value,
      ...input,
    }
  },
  mutateAndRender: (input) => {
    set({
      value: { ...get().value, ...input },
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
    const next = {
      value: {
        ...get().value,
        count: get().value.count + 1,
        players: {
          ...get().value.players,
          [userID]: player,
        },

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
}))
