import { useAtomValue } from 'jotai'
import { currentSectionIndexAtom } from '../atoms'

export const Text = () => {
    const currentSelectedIndex = useAtomValue(currentSectionIndexAtom)

    const text = (() => {
        switch (currentSelectedIndex) {
            case 1:
                return "Your turn? Pick a word and show off your artistic skills! Draw it for others to guess!"
            case 2:
                return "Watch others draw and be the first to guess correctly! Type your answers quickly!"
            case 3:
                return "Earn coins by drawing well and guessing fast to rise in ranking!"
            case 4:
                return "Also you can change controls in the settings. Ready? Let's begin!"
        }
    })()

    return <div className='text-sm text-white text-center px-2 rounded-md py-1'>
        {text}
    </div>
}