import { type ReactNode } from 'react'
import { api } from '@/src/trpc/server'
import { notFound } from 'next/navigation'

const ChatLayout = async ({ children }: { children: ReactNode }) => {
  const session = await api.user.getSession.query()

  if (!session) return notFound()
  return <div className="h-full w-full bg-slate-900">{children}</div>
}
export default ChatLayout
