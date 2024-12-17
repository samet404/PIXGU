import { useSpring, animated } from '@react-spring/web'
import { createPortal } from 'react-dom'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useWebRTCTroubleshootingGuideModal } from '@/zustand/store'

const Modal = dynamic(() => import('@/components/WebRTCTroubleshootingModal').then((m) => m.Modal))

export const NeedHelpBtn = () => {
    const isOpen = useWebRTCTroubleshootingGuideModal((s) => s.isOpen)
    const switchModal = useWebRTCTroubleshootingGuideModal((s) => s.switch)

    const [springs, api] = useSpring(() => ({
        from: {
            scale: 1,
            opacity: 1,
        },
        config: {
            duration: 400,
        },
    }))

    const handleClick = () => {
        api.start({
            from: {
                scale: 0.9,
                opacity: 0.7,
            },
            to: {
                scale: 1,
                opacity: 1,
            },
        })
        switchModal()
    }

    return (
        <Fragment>
            <animated.button
                onClick={handleClick}
                style={springs}
                className="z-10 flex h-full items-center justify-center rounded-md bg-[#ffffff82] px-4  text-[#02020285] hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-65"
            >
                Need Help?
            </animated.button>
            {typeof window !== 'undefined'
                ? isOpen
                    ? createPortal(<Modal />, document.body)
                    : null
                : null}
        </Fragment>
    )
}
