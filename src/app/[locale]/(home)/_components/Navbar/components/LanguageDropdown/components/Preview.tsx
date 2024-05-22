import { getLocale } from '@/context/server'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const Preview = () => {
  const locale = getLocale()

  return (
    <button
      className={`${inter.className} relative flex cursor-not-allowed rounded-md bg-[rgba(255,255,255,0.5)]  px-3 py-1 blur-sm`}
    >
      {locale.toUpperCase()}
    </button>
  )
}

export default Preview
