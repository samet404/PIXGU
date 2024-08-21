import { useIsWinnersChatOpen } from '@/zustand/store/useIsWinnersChatOpen'
import { useAtomValue } from 'jotai'
import { chatTypeAtom } from '../../atoms'
import type { PropsWithChildren } from 'react'
import { Change } from '../../Change'

export const IsOpenWrapper = ({ children }: PropsWithChildren) => {
  const isOpenInUI = useAtomValue(chatTypeAtom)
  const isOpen = useIsWinnersChatOpen((state) => state.value)

  if (isOpen && isOpenInUI === 'winnersChat') return children

  if (isOpenInUI === 'winnersChat')
    return (
      <div className="flex w-full animate-fade flex-col gap-2 rounded-lg bg-gradient-to-r from-[#65D6C0] to-[rgb(255,229,135)] p-2">
        <Change to="guessChat" />
        <div className="text-xl"> Winners chat is not available right now</div>
      </div>
    )
}
