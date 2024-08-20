import { create } from 'zustand'

type State = {
  isPaused: boolean
  reason:
    | {
        code: 'connectingHost'
        description: 'Connecting to host'
      }
    | {
        code: 'connectedHost'
      }
    | {
        code: 'gamePausedByHost'
        description: 'Game paused by host'
      }
    | { code: 'startedGameByHost' }
    | {
        code: 'gameOver'
        description: 'Game over'
      }
    | { code: 'newRound' }
    | {
        code: 'waitingForPlayersToJoin'
        description: 'Waiting for players to join'
      }
    | {
        code: 'enoughPlayersToStart'
      }
}

type Action = {
  set: (input: State) => void
  get: () => State
}

export const useIsGamePaused = create<State & Action>((set, get) => ({
  isPaused: true,
  reason: {
    code: 'connectingHost',
    description: 'Connecting to host',
  },

  get: () => get(),

  set: (input) =>
    set({
      ...input,
    }),
}))
