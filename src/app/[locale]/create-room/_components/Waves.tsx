import waves from '@/png/waves.png'
import Image from 'next/image'

export const Waves = () => {
  return (
    <Image
      className="absolute bottom-0 z-0 w-full animate-fade pt-24 opacity-55"
      src={waves}
      alt="waves"
    />
  )
}
