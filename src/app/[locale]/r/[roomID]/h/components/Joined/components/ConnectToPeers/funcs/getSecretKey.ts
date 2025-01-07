import { grayLog } from '@/utils/grayLog';
import { usePeers } from '@/zustand/store';
import type { Socket } from 'socket.io-client';

export const getSecretKey = (io: Socket) =>
    io.on('secret-key', ({ userID, secretKey }: ReceviedData) => {
        grayLog('SECRET KEY RECEIVED')
        usePeers.getState().addSecretKey(userID, secretKey)
    })

type ReceviedData = {
    userID: string
    secretKey: string
}