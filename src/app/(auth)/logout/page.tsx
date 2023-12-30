import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/api/auth/[...nextauth]/authOptions'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'

import SignOutButton from './components/SignOutButton'
import SignOutBackButton from './components/SignOutBackButton'
const inter = Inter({
  subsets: ['latin'],
  weight: ['900', '400'],
})

const SignOut = async () => {
  const session = await getServerSession(authOptions)

  if (session == null) return redirect('/')

  return (
    <div className="flex h-full w-full items-start justify-center bg-slate-900 pt-8">
      <div className="flex w-[20rem] animate-fade-down flex-col items-center justify-start gap-5 rounded-md border-[0.2rem] border-[#ff3c56] bg-slate-700 pb-5 shadow-[0_0px_20px_6px_rgba(255,40,0,0.3)]">
        <div
          className={`${inter.className} w-full bg-[#ff3c56] text-center text-xl font-[900] text-[#00000089]`}
        >
          SIGNOUT
        </div>
        <div
          className={`${inter.className} p-2 text-center leading-5 text-[#ff3c56]`}
        >
          Are you sure you want to sign out ?
        </div>

        <SignOutBackButton />
        <SignOutButton />
      </div>
    </div>
  )
}

export default SignOut
