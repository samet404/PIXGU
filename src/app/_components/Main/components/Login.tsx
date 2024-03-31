import { Fragment } from 'react'

import MainButton from './MainButton'
import login from '@/png/login.png'
import Image from 'next/image'
import { api } from '@/trpc/server'

const Login = async () => {
  const session = await api.auth.getSession.query()

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
