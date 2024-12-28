import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const OpenerBtn = ({ lang }: Props) => {
  return (
    <button
      className={`${inter.className} rounded-md bg-[rgba(255,255,255,0.4)] px-3 py-1`}
    >
      {lang.toUpperCase()}
    </button>
  )
}

export default OpenerBtn

type Props = {
  lang: string
}
