import { useUserIDStore } from '@/zustand/provider'
import { useMouseDown, useMouseMove, useMouseOut, useMouseUp } from './hooks'

export const useCanvasDraw = () => {
  const myUserID = useUserIDStore((state) => state.userID)

  // Mouse events
  useMouseOut()
  useMouseUp()
  useMouseDown(myUserID)
  useMouseMove(myUserID)
}
