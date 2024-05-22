import type { MutableRefObject } from 'react'
import type SimplePeer from 'simple-peer'

export type PeersRef = MutableRefObject<
  | Partial<
      Record<
        userID,
        {
          peer: SimplePeer.Instance
        }
      >
    >
  | undefined
>

type userID = string
