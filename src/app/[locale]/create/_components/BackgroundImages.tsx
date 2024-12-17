import Image from 'next/image'
import starImg from '@/png/star.png'
import smStarImg from '@/png/smstar.png'
import smStar2Img from '@/png/smstar2.png'
import explosionImg from '@/png/explosion.png'
import planetImg from '@/png/planet.png'
import octopus from '@/png/octopus.png'

const BackgroundImages = () => {
  return (
    <div className="pointer-events-none absolute h-[30rem] w-full animate-fade drop-shadow-[0_0px_10px_rgba(0,0,0,0.8)]">
      <Image
        className="absolute left-[10%] top-[10%] size-10 rotate-12 opacity-30"
        src={starImg}
        alt="star"
        sizes="calc(1vw + 37px)"
      />

      <Image
        className="absolute left-[20%] top-[30%] size-7  opacity-20"
        src={smStarImg}
        alt="smStar"
        sizes="calc(0.7vw + 26px)"
      />
      <Image
        className="absolute  right-[10%] top-[18%] size-10 rotate-12 opacity-30"
        src={smStar2Img}
        alt="smStar2"
        sizes="calc(1vw + 37px)"
      />

      <Image
        className="absolute  bottom-[10%] right-[10%] size-10 rotate-12 opacity-30"
        src={explosionImg}
        alt="explosion"
        sizes="calc(1vw + 37px)"
      />

      <Image
        className="absolute  bottom-[14%] left-[10%] size-10 rotate-12 opacity-30"
        src={planetImg}
        alt="planet"
        sizes="calc(1vw + 37px)"
      />

      <Image
        className="absolute  bottom-[10%] right-[25%] size-10 rotate-12 opacity-30"
        src={octopus}
        alt="octopus"
        sizes="calc(1vw + 37px)"
      />
    </div>
  )
}

export default BackgroundImages
