import { Fragment } from 'react'

import MainButton from './MainButton'
import login from '@/png/login.png'

import { auth } from '@/auth/lucia'
import * as context from 'next/headers'

import Image from 'next/image'

const Login = async () => {
  const authRequest = auth.handleRequest('GET', context)
  const session = await authRequest.validate()

  return !session ? (
    <MainButton
      link="/login"
      icon={
        <Image
          className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
          src={login}
          alt="login"
        />
      }
      name="Giriş yap"
      description="Hızlı bir şekilde giriş yapın ve devam edin."
      keyName="4"
      className="rounded-br-md hover:from-[rgba(59,164,255,0.4)] hover:to-[rgba(255,255,255,0.3)]"
    />
  ) : null
}

export default Login
