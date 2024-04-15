import { type ReactNode } from 'react'
import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'
import './_styles/scrollbar.css'

const ChatLayout = async ({ children }: { children: ReactNode }) => {
  const logged = await api.auth.isLogged.query()

  if (!logged) return redirect('/login')

  return <div className="h-full w-full bg-slate-900">{children}</div>
}
export default ChatLayout
