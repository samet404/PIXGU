import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { type ComponentProps } from 'react'

const inter700 = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const Btn = ({ loading, ...others }: Props) => (
  <button
    {...others}
    disabled={loading}
    className={clsx(
      `${inter700.className} h-full w-full select-none rounded-b-md bg-gradient-to-tr from-[#fff459] to-[#f6ff00] py-3 text-[rgba(0,0,0,0.4)] shadow-[0_0px_10px_5px_rgba(255,255,255,0.3)]`,
      {
        'animate-pulse opacity-50': loading,
      },
    )}
  >
    {loading ? 'Creating...' : 'Create'}
  </button>
)

export default Btn

type Props = {
  loading: boolean
} & ComponentProps<'button'>
