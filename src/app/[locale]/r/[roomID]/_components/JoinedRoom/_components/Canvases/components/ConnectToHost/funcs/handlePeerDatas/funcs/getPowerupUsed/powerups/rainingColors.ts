import { fillOnePixel } from '@/helpers/room'
import type { RainingColorsPowerupData } from '@/types'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

export const rainingColors = (userID: string, data: RainingColorsPowerupData) => {
    const { cellPixelLength, mctx } = useCanvasesMainData.getState()

    for (let i = 0; i < data.length; i++) {
        const [color, coors] = data[i]!
        fillOnePixel(mctx!, coors[0], coors[1], cellPixelLength!, color)
    }

    usePlayersPowerups.getState().setPowerupInActive(userID, 'rainingColors')
}