import { auth } from '@/auth/lucia'
import * as context from 'next/headers'
import { redirect } from 'next/navigation'

const Settings = async () => {
  const authRequest = auth.handleRequest('GET', context)
  const session = await authRequest.validate()

  return session ? redirect('settings/account') : redirect('settings/themes')
}

export default Settings
