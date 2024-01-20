import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'

const Settings = async () => {
  const session = await api.user.getSession.query()
  return session ? redirect('settings/account') : redirect('settings/themes')
}

export default Settings
