import MainButton from './MainButton'
import Image from 'next/image'
import play from '@/png/play.png'

const QuickMatch = ({ name, description }: Props) => {
  return (
    <MainButton
      link="/f"
      icon={
        <Image
          className="size-12 opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
          src={play}
          alt="quick-match"
        />
      }
      name={name}
      description={description}
      keyName="3"
      roundedClass={'rounded-tl-md'}
      className="h-full w-full hover:from-[rgba(53,255,147,0.4)] hover:to-[rgba(255,255,255,0.3)]"
    />
  )
}

export default QuickMatch

type Props = {
  name: string
  description: string
}
