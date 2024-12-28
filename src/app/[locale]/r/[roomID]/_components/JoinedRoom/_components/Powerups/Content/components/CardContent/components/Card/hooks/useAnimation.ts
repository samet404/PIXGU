import { useSpring } from '@react-spring/web'
import { useEffect } from 'react'

export const useAnimation = (addTranslateX: number, addTranslateY: number, rotation: number) => {
    const [springs, api] = useSpring(() => ({
        from: {
            scale: 1,
            translateY: addTranslateY,
            translateX: addTranslateX,
            rotate: rotation,
            opacity: 1
        },
        config: { tension: 100, friction: 10 },
    }))


    useEffect(() => {
        api.start({
            translateY: addTranslateY,
            translateX: addTranslateX,
            rotate: rotation,
            immediate: false,
            config: { tension: 120, friction: 14 }
        })
    }, [addTranslateY, addTranslateX, rotation, api])

    return { springs, api }
}
