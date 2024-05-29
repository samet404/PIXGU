import {
  CanvasesDataContext,
  PeersContext,
  UserIDContext,
} from '@/context/client'
import { getElementByID } from '@/utils'
import { useContext } from 'react'
import { draw } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'

export const useMouseMove = () => {
  const canvasData = useContext(CanvasesDataContext)!
  const peers = useContext(PeersContext)
  const userID = useContext(UserIDContext)

  const handler = (e: MouseEvent) => {
    console.log('mousemove')
    if (e.button !== 0) return null

    canvasData.painter.painting = true

    draw(canvasData, peers, userID, e)
  }

  useEffectOnce(() => {
    if (!canvasData.draft)
      canvasData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

    canvasData.draft.addEventListener('mousedown', handler)

    return () => {
      canvasData.draft!.removeEventListener('mousedown', handler)
    }
  })
}
