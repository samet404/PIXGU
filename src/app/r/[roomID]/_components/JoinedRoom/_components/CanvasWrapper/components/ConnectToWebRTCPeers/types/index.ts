import type SimplePeer from 'simple-peer'

export type UserID = string

export type SignalData = {
  userID: UserID
  signal: SimplePeer.SignalData
}

export * from './webRTCConnData'
