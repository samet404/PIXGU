import { atom } from 'jotai'

export type WsUrl = 'wscanary.pixgu.com' | 'ws.pixgu.com' | 'ws2.pixgu.com' | 'localhost:5000'
export const wsUrlAtom = atom<WsUrl>('wscanary.pixgu.com')