import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

const Friend = ({ name, pfp }: { name: string; pfp: string }) => {
  return (
    <button
      className={`${inter.className} flex flex-row items-center gap-2 rounded-md p-2 text-[#ffffffc9] hover:bg-gradient-to-r hover:from-[#ffffff46] hover:to-transparent`}
    >
      <div className="">{name}</div>
    </button>
  )
}

export default Friend
