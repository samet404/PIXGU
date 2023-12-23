import MainButton from './MainButton'
import Image from 'next/image'
import questionmark from '@/png/questionmark.png'
import clsx from 'clsx'
import { authOptions } from '@/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'

const HowToPlay = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div
      className={clsx({
        'md:col-span-2': session != null,
      })}
    >
      <MainButton
        link="/article/how-to-play"
        icon={
          <Image
            className=" opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
            src={questionmark}
            alt="questionmark"
          />
        }
        name="Nasıl oynanır?"
        description="Nasıl oynayacağını bilmiyor musun? Hemen öğren!"
        keyName="3"
        className={clsx(
          'h-full w-full rounded-bl-md hover:from-[rgba(53,228,255,0.4)] hover:to-[rgba(255,255,255,0.3)]',
          {
            'rounded-b-md': session != null,
          },
        )}
      />
    </div>
  )
}

export default HowToPlay
