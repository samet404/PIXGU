import { Adamina, Inter } from 'next/font/google'

const adamina = Adamina({
  subsets: ['latin'],
  weight: ['400'],
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

type KeyProps = {
  name: string
  keyName: string
}

const Key = ({ name, keyName }: KeyProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-md  bg-[rgba(255,255,255,0.5)] p-3">
        <div className={`${inter.className} text-[rgba(0,0,0,0.7)]`}>
          {keyName}
        </div>
      </div>
      <div className={`${inter.className} text-[rgba(255,255,255,0.4)]`}>
        {name}
      </div>
    </div>
  )
}

export default Key
