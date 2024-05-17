import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'

const Settings = async () => {
  const isLogged = await api.auth.isLogged.query()

  return isLogged ? redirect('settings/account') : redirect('settings/themes')
}

export default Settings
