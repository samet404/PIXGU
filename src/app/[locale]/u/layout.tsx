import type { PropsWithChildren } from 'react'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700', '500', '600'],
})

const UserLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`${urbanist.className} h-full w-full bg-gradient-to-br from-[#a6bd9e] via-[#a3cbce] to-[#96c8b4]`}
    >
      {children}
    </div>
  )
}

export default UserLayout
