'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const SignOutButton = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <button
      onClick={handleOnClick}
      className={`${inter.className} w-auto rounded-md bg-[#ff3c56] px-4 py-2 text-[rgba(0,0,0,0.8)] shadow-[0_0px_60px_-15px_rgba(0,0,0,1)]`}
    >
      Yes, let me out
    </button>
  )
}

export default SignOutButton
