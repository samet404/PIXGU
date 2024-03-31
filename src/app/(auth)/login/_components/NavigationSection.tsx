import BackButton from '@/components/BackButton'
import ToHomeButton from '@/components/ToHomeButton'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

const NavigationSection = () => {
  const buttonClassName =
    'rounded-md bg-[rgba(255,255,255,0.2)] p-1 text-[rgba(255,255,255,0.47)]'

  return (
    <section
      className={`${inter.className} grid w-full grid-cols-2 gap-2 pb-5`}
    >
      <BackButton className={buttonClassName}>{'< Back'}</BackButton>
      <ToHomeButton className={buttonClassName}>{'Home'}</ToHomeButton>
    </section>
  )
}

export default NavigationSection
