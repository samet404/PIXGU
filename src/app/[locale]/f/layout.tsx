import { type ReactNode } from 'react'
import Nav from './_components/Nav'
import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const FriendsLayout = async ({ children }: { children: ReactNode }) => {
  const isLogged = await api.auth.isLogged.query()

  if (!isLogged)
    return (
      <ErrDisplay
        msg="UNAUTHORIZED"
        reason="You need to be logged in to interact with your friends"
        code={401}
        redirectTo="/login"
      />
    )

  if (isLogged)
    return (
      <div
        style={{
          backgroundImage:
            'radial-gradient(at 50% 100%, hsla(220, 100%, 50%, 0.233) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(212, 100%, 50%, 0.1) 0px, transparent 50%)',
        }}
        className="flex h-full w-full flex-col items-center p-5"
      >
        {children}
        <Nav />
      </div>
    )
}

export default FriendsLayout
