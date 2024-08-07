import {
  CanvasesMainDataContext,
  PainterDataContext,
  PeersContext,
  UserIDContext,
} from '@/context/client'
import { getElementByID } from '@/utils'
import { useContext } from 'react'
import { draw } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { HostPeerCtx } from '@/context/client/react/hostPeerCtx'

export const useMouseMove = () => {
  const canvasesMainData = useContext(CanvasesMainDataContext)!
  const painterData = useContext(PainterDataContext)
  const hostPeer = useContext(HostPeerCtx)
  const userID = useContext(UserIDContext)

  const handler = (e: MouseEvent) => {
    console.log('mousemove')
    if (!painterData?.value?.amIPainter) return null

    if (e.button !== 0) return null

    painterData.value.amIpainting = true

    draw(canvasesMainData, painterData, hostPeer, userID, e)
  }

  useEffectOnce(() => {
    if (!canvasesMainData.draft)
      canvasesMainData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

    canvasesMainData.draft.addEventListener('mousedown', handler)

    return () => {
      canvasesMainData.draft!.removeEventListener('mousedown', handler)
    }
  })
}
