import { useAtomValue } from 'jotai'
import { chatTypeAtom } from '../../atoms'
import type { PropsWithChildren } from 'react'
import { useIsGuessChatOpen } from '@/zustand/store/useIsGuessChatOpen'
import { Change } from '../../Change'

export const IsOpenWrapper = ({ children }: PropsWithChildren) => {
  const isOpenInUI = useAtomValue(chatTypeAtom)
  const isOpen = useIsGuessChatOpen((state) => state.value)

  if (isOpen && isOpenInUI === 'guessChat') return children
  if (isOpenInUI === 'guessChat')
    return (
      <div>
        <Change to="winnersChat" />
      </div>
    )
}
