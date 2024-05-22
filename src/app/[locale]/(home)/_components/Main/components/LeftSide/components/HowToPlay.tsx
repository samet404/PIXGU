import MainButton from './MainButton'
import Image from 'next/image'
import paperAndInk from '@/png/paperAndInk.png'
import clsx from 'clsx'

const HowToPlay = async ({ name, description }: Props) => {
  return (
    <div>
      <MainButton
        link="/htp"
        icon={
          <Image
            className=" opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
            src={paperAndInk}
            alt="questionmark"
          />
        }
        name={name}
        description={description}
        keyName="3"
        className={clsx(
          'h-full w-full  hover:from-[rgba(53,228,255,0.4)] hover:to-[rgba(255,255,255,0.3)]',
        )}
      />
    </div>
  )
}

export default HowToPlay

type Props = {
  name: string
  description: string
}
