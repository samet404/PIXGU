import type { UndoRedo } from '@/types'
import { sendToAllPeers } from '@/utils'
import { postMsgToCanvasWorker } from '@/workers'
import { useWhoIsPainter } from '@/zustand/store'

export const getUndoRedo = (data: UndoRedo['data'], userID: string) => {
    if (!useWhoIsPainter.getState().isPainter(userID)) return

    const event = data.type === 0 ?
        data.direction === 0 ? 'undoByOperation' : 'redoByOperation' :
        data.type === 1 ? 'redo' : 'undo'

    postMsgToCanvasWorker({
        e: event,
    })

    sendToAllPeers({
        event: 'undoRedo',
        data,
    }, {
        except: [userID]
    })
}