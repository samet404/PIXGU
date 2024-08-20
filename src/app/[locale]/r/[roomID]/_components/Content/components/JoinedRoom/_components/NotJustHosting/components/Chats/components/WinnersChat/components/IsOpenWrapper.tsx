import { useIsWinnersChatOpen } from '@/zustand/store/useIsWinnersChatOpen'
import { useAtomValue } from 'jotai'
import { chatTypeAtom } from '../../atoms'
import type { PropsWithChildren } from 'react'
import { Change } from '../../Change'

export const IsOpenWrapper = ({ children }: PropsWithChildren) => {
  const isOpenInUI = useAtomValue(chatTypeAtom)
  const isOpen = useIsWinnersChatOpen((state) => state.value)

  if (isOpen && isOpenInUI === 'winnersChat') return children

  if (isOpenInUI === 'winnersChat') <Change to="guessChat" />
}
