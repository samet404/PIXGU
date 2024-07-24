import { CanvasesMainDataContext, PainterDataContext } from '@/context/client'
import { HostPeerCtx } from '@/context/client/react/hostPeerCtx'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { getElementByID } from '@/utils'
import { useContext } from 'react'

export const useMouseOut = () => {
  const canvasData = useContext(CanvasesMainDataContext)!
  const painterData = useContext(PainterDataContext)

  const handler = () => {
    if (!painterData?.value?.amIPainter) return null

    painterData.value.amIpainting = true

    const dctx = canvasData.draft!.getContext('2d')!
    dctx.beginPath()
  }

  useEffectOnce(() => {
    if (!canvasData.draft)
      canvasData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

    canvasData.draft.addEventListener('mouseout', handler)

    return () => {
      canvasData.draft!.removeEventListener('mouseout', handler)
    }
  })
}
