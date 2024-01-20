import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['900'],
})

const Title = () => {
  return (
    <h3
      className={`${outfit.className} w-full rounded-t-md bg-[rgba(255,255,255,0.2)] text-center text-[rgba(255,255,255,0.6)] drop-shadow-[0_0px_2px_rgba(0,0,0,1)]`}
    >
      {'Oda Oluştur'}
    </h3>
  )
}

export default Title
