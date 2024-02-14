import Image from 'next/image'
import bg from '@/jpg/annie-spratt-XBN773gtJm8-unsplash.jpg'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500']
})

const Chat = () => {
  if (false) return (
    <div className={`${inter.className} bg-gradient-to-tr from-[#ffffff77] rounded-lg via-transparent to-[#ffffff77] flex h-full w-full items-center justify-center text-white`}>
      {"There's nothing to see here for now"}
    </div>
  )

  if (true) redirect('/chat/figen@9900')
}

export default Chat
