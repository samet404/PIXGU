import { useAtomValue } from 'jotai'
import { currentSectionIndexAtom } from '../atoms'
import { clsxMerge } from '@/utils/clsxMerge'

export const Text = () => {
    const currentSelectedIndex = useAtomValue(currentSectionIndexAtom)

    const text = (() => {
        switch (currentSelectedIndex) {
            case 1:
                return "Your turn! Pick a word and start drawing!"
            case 2:
                return "Watch and guess fast to win!"
            case 3:
                return "Draw well, guess quick, earn coins!"
        }
    })()

    return <div className={clsxMerge('text-[1.5rem] w-[50rem] animate-fade-blur font-[800] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] text-center px-2 rounded-md py-1', {
        'text-[#ffffff]': currentSelectedIndex === 1,
        'text-[#ace4fe]': currentSelectedIndex === 2,
        'text-[#faca20]': currentSelectedIndex === 3
    })}>
        {text}
    </div>
}