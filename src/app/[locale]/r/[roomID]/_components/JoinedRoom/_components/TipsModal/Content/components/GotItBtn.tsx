import { currentSectionIndexAtom, showTipsModalAtom } from '../atoms'
import { useAtomValue, useSetAtom } from 'jotai'

export const GotItBtn = () => {
    const selectedIndex = useAtomValue(currentSectionIndexAtom)
    const setShowTipsModal = useSetAtom(showTipsModalAtom)

    const handleClick = () => {
        localStorage.setItem('showTips', '1')
        setShowTipsModal(false)
    }

    if (selectedIndex === 4) return (
        <button
            onMouseDown={handleClick}
            className='flex items-center rounded-md justify-center px-2 py-1 text-white shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)] bg-green-400' >
            Let's go!
        </button >
    )
}