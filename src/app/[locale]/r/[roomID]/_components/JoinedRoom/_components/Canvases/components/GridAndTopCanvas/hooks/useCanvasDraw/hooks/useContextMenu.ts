import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'

export const useContextMenu = () => {
    const handler = (e: any) => e.preventDefault()

    useEffectOnce(() => {
        const { grid } = useCanvasesMainData.getState()

        grid!.addEventListener('contextmenu', handler)

        return () =>
            grid!.removeEventListener('contextmenu', handler)
    })
}