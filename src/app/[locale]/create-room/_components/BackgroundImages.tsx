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
    <div className="absolute h-[30rem] w-full drop-shadow-[0_0px_10px_rgba(0,0,0,0.8)]">
      <Image
        className="absolute left-[10%] top-[10%] size-10 rotate-12 opacity-30"
        src={starImg}
        alt="star"
      />

      <Image
        className="absolute left-[20%] top-[30%] size-7  opacity-20"
        src={smStarImg}
        alt="smStar"
      />
      <Image
        className="absolute  right-[10%] top-[18%] size-10 rotate-12 opacity-30"
        src={smStar2Img}
        alt="smStar2"
      />

      <Image
        className="absolute  bottom-[10%] right-[10%] size-10 rotate-12 opacity-30"
        src={explosionImg}
        alt="explosion"
      />

      <Image
        className="absolute  bottom-[14%] left-[10%] size-10 rotate-12 opacity-30"
        src={planetImg}
        alt="planet"
      />

      <Image
        className="absolute  bottom-[10%] right-[25%] size-10 rotate-12 opacity-30"
        src={octopus}
        alt="octopus"
      />
    </div>
  )
}
export default BackgroundImages
