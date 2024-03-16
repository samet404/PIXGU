import MainButton from './MainButton'
import Image from 'next/image'
import paperAndInk from '@/png/paperAndInk.png'
import clsx from 'clsx'
import { auth } from '@/auth/lucia'
import * as context from 'next/headers'

const HowToPlay = async () => {
  return (
    <div>
      <MainButton
        link="/article/howtoplay"
        icon={
          <Image
            className=" opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
            src={paperAndInk}
            alt="questionmark"
          />
        }
        name="Nasıl oynanır?"
        description="Nasıl oynayacağını bilmiyor musun? Hemen öğren!"
        keyName="3"
        className={clsx(
          'h-full w-full rounded-bl-md hover:from-[rgba(53,228,255,0.4)] hover:to-[rgba(255,255,255,0.3)]',
        )}
      />
    </div>
  )
}

export default HowToPlay
