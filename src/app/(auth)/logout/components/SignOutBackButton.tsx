import BackButton from '@/components/BackButton'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],

  weight: ['600'],
})

const SignOutBackButton = () => (
  <BackButton
    className={`${inter.className} rounded-md bg-gradient-to-tr from-emerald-500 to-emerald-400 px-4 py-2 text-[rgba(0,0,0,0.8)]  shadow-[0_0px_60px_-15px_rgba(0,0,0,1)]`}
  >
    {'I changed my mind'}
  </BackButton>
)

export default SignOutBackButton
