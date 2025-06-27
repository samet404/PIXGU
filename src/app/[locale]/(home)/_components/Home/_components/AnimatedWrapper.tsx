import type { CSSProperties } from 'react'

const gradients: (CSSProperties & { id: number })[] = [
  {
    id: 1,
    backgroundImage:
      'radial-gradient(at 2% 0%, hsla(309, 100%, 50%, 0.475) 0px, transparent 50%)',
    transitionDuration: '4s',
    transitionDelay: '8s',
    animationDuration: '12s',
  },
  {
    id: 2,
    backgroundImage:
      'radial-gradient(at 50% 0%, hsla(309, 100%, 50%, 0.475) 0px, transparent 50%)',
    transitionDuration: '3s',
    transitionDelay: '2s',
    animationDuration: '15s',
  },
  {
    id: 3,
    backgroundImage:
      'radial-gradient(at 100% 100%, hsla(142,7%,70%,0.1) 0px, transparent 50%)',
    transitionDuration: '4s',
    transitionDelay: '3s',
    animationDuration: '10s',
  },
  {
    id: 4,
    backgroundImage:
      'radial-gradient(at 100% 0%, hsla(309, 100%, 50%, 0.3) 0px, transparent 50%)',
    transitionDuration: '3s',
    transitionDelay: '1s',
    animationDuration: '12s',
  },
  {
    id: 5,
    backgroundImage:
      'radial-gradient(at 100% 0%, hsla(309, 100%, 50%, 0.3) 0px, transparent 50%)',
    transitionDuration: '5s',
    transitionDelay: '0s',
    animationDuration: '4s',
  },
]

export const AnimatedBackground = ({
  children,
}: {
  children: React.ReactNode
}) => {
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
        return (
          <div
            key={gradient.id}
            style={{
              ...gradient,
            }}
            className="absolute bottom-0 top-0 h-full w-full animate-pulse"
          ></div>
        )
      })}
      {children}
    </div>
  )
}
