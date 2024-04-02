import Image from 'next/image'
import starImg from '@/png/star.png'
import smStarImg from '@/png/smstar.png'
import smStar2Img from '@/png/smstar2.png'
import explosionImg from '@/png/explosion.png'
import planetImg from '@/png/planet.png'
import octopus from '@/png/octopus.png'
import waves from '@/png/waves.png'
// ;<Image className="absolute bottom-0" src={waves} alt="waves" />

const BackgroundImages = () => {
  return (
    <div className="absolute h-[50rem] w-full drop-shadow-[0_0px_10px_rgba(0,0,0,0.8)]">
      <div className="w-[60rem]">
        <Image
          className="absolute left-7 top-11 size-10 rotate-12 opacity-30"
          src={starImg}
          alt="star"
        />

        <Image
          className="absolute bottom-60 left-7 size-7  opacity-20"
          src={smStarImg}
          alt="smStar"
        />
        <Image
          className="absolute right-14 top-72 size-10 rotate-12 opacity-30"
          src={smStar2Img}
          alt="smStar2"
        />

        <Image
          className="absolute bottom-40 right-28 size-10 rotate-12 opacity-30"
          src={explosionImg}
          alt="explosion"
        />

        <Image
          className="absolute right-28 top-28 size-10 rotate-12 opacity-30"
          src={planetImg}
          alt="planet"
        />

        <Image
          className="absolute bottom-20 left-20 size-10 rotate-12 opacity-30"
          src={octopus}
          alt="octopus"
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <Image className="w-full opacity-55" src={waves} alt="waves" />
      </div>
    </div>
  )
}
export default BackgroundImages
