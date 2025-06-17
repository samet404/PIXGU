import type { CSSProperties } from 'react'

const gradients: CSSProperties[] = [
    {
        backgroundImage: 'radial-gradient(at 2% 0%, hsla(309, 100%, 50%, 0.475) 0px, transparent 50%)',
        transitionDuration: '4s',
        transitionDelay: '8s',
        animationDuration: '12s',
    },
    {
        backgroundImage: 'radial-gradient(at 50% 0%, hsla(309, 100%, 50%, 0.475) 0px, transparent 50%)',
        transitionDuration: '3s',
        transitionDelay: '2s',
        animationDuration: '15s',
    },
    {
        backgroundImage: 'radial-gradient(at 100% 100%, hsla(142,7%,70%,0.1) 0px, transparent 50%)',
        transitionDuration: '4s',
        transitionDelay: '3s',
        animationDuration: '10s',
    },
    {
        backgroundImage: 'radial-gradient(at 100% 0%, hsla(309, 100%, 50%, 0.3) 0px, transparent 50%)',
        transitionDuration: '3s',
        transitionDelay: '1s',
        animationDuration: '12s',
    },
    {
        backgroundImage: 'radial-gradient(at 100% 0%, hsla(309, 100%, 50%, 0.3) 0px, transparent 50%)',
        transitionDuration: '5s',
        transitionDelay: '0s',
        animationDuration: '4s',
    }
]

export const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            style={{
                backgroundColor: 'hsla(220,39%,10%,1)',
                scrollbarWidth: 'none',
            }}
            id="home-root"
            className="flex h-full w-full flex-col items-center justify-between overflow-y-scroll"
        >
            {gradients.map((gradient) => {
                return <div
                    key={gradient.backgroundImage}
                    style={{
                        ...gradient,
                    }}
                    className='w-full h-full absolute top-0 bottom-0 animate-fade animate-pulse'
                ></div>
            })}
            {children}
        </div>
    )
}