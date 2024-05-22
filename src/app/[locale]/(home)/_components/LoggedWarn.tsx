import { getIsLogged } from '@/context/server'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({ subsets: ['latin'], weight: ['700'] })

const LoggedWarn = () => {
  const isLogged = getIsLogged()

  if (isLogged) return null
  return (
    <div
      className={`${urbanist.className} flex animate-fade-down cursor-help rounded-lg bg-gradient-to-tr from-[#bcfcc8] to-[#b9f6f1] px-3 py-1 text-center text-[0.8rem] text-[#000000c1] shadow-[inset_0_0px_10px_1px_rgba(0,0,0,0.8)]`}
    >
      You can open blurred buttons only when you are logged in.
    </div>
  )
}
export default LoggedWarn
