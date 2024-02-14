import { type ReactNode } from 'react'
import Nav from './_components/Nav'
import { api } from '@/src/trpc/server'
import { redirect } from 'next/navigation'

const FriendsLayout = async ({ children }: { children: ReactNode }) => {
  const session = await api.user.getSession.query()
  
  if (!session) redirect('/login')

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
