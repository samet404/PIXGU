import type { GameLog } from '@/types/webRTCConnData';
import { useGameLogs } from '@/zustand/store/gameLogs';

export const getGameLog = (rtcData: GameLog['data']) => {
    useGameLogs.getState().add(rtcData)
}