import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

type KeyProps = {
  name: string
  keyName: string
}

const Key = ({ name, keyName }: KeyProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center border-[2px] border-gray-400  bg-white p-2">
        <div className={`${inter.className}`}>{keyName}</div>
      </div>
      <div className={`${inter.className}`}>{name}</div>
    </div>
  )
}

export default Key
