import { Outfit } from 'next/font/google'
import Link from 'next/link'

const outfit = Outfit({ subsets: ['latin'], weight: '600' })

const Start = () => {
  return (
    <div
      className={`${outfit.className} flex h-full w-full flex-col items-center justify-center bg-gradient-to-tr from-yellow-50 via-yellow-100 via-[50%] to-[#525451]  p-2`}
    >
      <Link
        href={'/login'}
        className="duration-400  rounded-lg text-center text-[2rem] text-[#0000008e] transition-opacity hover:opacity-50"
      >
        Join us to spark your imagination
      </Link>
    </div>
  )
}

export default Start
