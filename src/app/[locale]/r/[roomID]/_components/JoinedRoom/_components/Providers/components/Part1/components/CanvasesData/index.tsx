import type { RChildren } from '@/types'
import { Main } from './components/Main'
import { Painter } from './components/Painter'

export const CanvasesData = ({ children }: RChildren) => {
  return (
    <Main>
      <Painter>{children}</Painter>
    </Main>
  )
}
