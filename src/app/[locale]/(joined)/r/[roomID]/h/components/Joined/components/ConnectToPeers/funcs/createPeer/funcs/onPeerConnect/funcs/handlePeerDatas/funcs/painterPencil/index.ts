import type { PainterPencil } from '@/types/webRTCConnData';
import { pencil } from './pencil';
import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { useWhoIsPainter } from '@/zustand/store';

export const getPainterPencil = (data: PainterPencil['data'], userID: string) => {
    // if (!useWhoIsPainter.getState().isPainter(userID)) return

    pencil(data)
    sendToAllPeers({
        from: 'host',
        event: 'painterPencil',
        data
    }, {
        except: [userID]
    })
}
