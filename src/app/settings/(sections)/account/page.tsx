// https://lucia-auth.com/guidebook/github-oauth/nextjs-app/#profile-page

import { GeistSans } from 'geist/font/sans'
import { auth } from '@/auth/lucia'
import * as context from 'next/headers'
import { redirect } from 'next/navigation'

import LuciaForm from '@/components/LuciaForm'
import Image from 'next/image'

const Account = async () => {
  const authRequest = auth.handleRequest('GET', context)
  const session = await authRequest.validate()

  if (!session) redirect('/login')
  return (
    <section className="flex h-full w-full animate-fade flex-col gap-6">
      <h1
        className={`${GeistSans.className} w-full rounded-md bg-slate-300 p-2 font-[900]`}
      >
        Account Settings
      </h1>

      <div className="flex flex-col gap-2">
        {session.user.profilePicture ? (
          // <Image
          //   className="h-20 w-20 rounded-full bg-black"
          //   src={session.user.profilePicture}
          //   width={80}
          //   height={80}
          //   alt="Profile Picture"
          // />
          <div className='className="h-20 bg-black" w-20 rounded-full'></div>
        ) : (
          <div className='className="h-20 bg-black" w-20 rounded-full'></div>
        )}
        <LuciaForm action="/api/auth/logout">
          <input
            className={`${GeistSans.className} rounded-md border-[0.2rem] border-[#ffffffb0] !bg-rose-500 px-2 py-1 font-[500] shadow-[0_0px_60px_-3px_rgba(0,0,0,0.3)]`}
            type="submit"
            value={'Log out'}
          />
        </LuciaForm>
      </div>
    </section>
  )
}

export default Account
