import { auth } from '@/auth/lucia'
import * as context from 'next/headers'
import Account from './(sections)/account/page'
import Themes from './(sections)/themes/page'

const Settings = async () => {
  const authRequest = auth.handleRequest('GET', context)
  const session = await authRequest.validate()

  console.log(typeof session, session)
  return session ? <Account /> : <Themes />
}

export default Settings
