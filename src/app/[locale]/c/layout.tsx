import { type ReactNode } from 'react'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const Fragment = dynamic(() => import('react').then((r) => r.Fragment))

const ChatLayout = async ({ children }: { children: ReactNode }) => {
  const logged = await api.auth.isLogged.query()

  if (!logged)
    return (
      <ErrDisplay
        msg="UNAUTHORIZED"
        reason="You need to be logged in to chat with your friends"
        code={401}
        redirectTo="/login"
      />
    )

  await require('./_styles/scrollbar.css')

  return <Fragment>{children}</Fragment>
}
export default ChatLayout
