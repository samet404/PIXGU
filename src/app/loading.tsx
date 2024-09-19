import spinner from '@/svg/spinner-one-third-svgrepo-com.svg'
import Image from 'next/image'

const loading = () => {
  return (
    <div className="flex h-full w-full animate-fade items-center justify-center bg-[#03172a]">
      <Image
        src={spinner}
        alt="spinner"
        className="size-11 animate-spin animate-infinite"
      />
    </div>
  )
}

export default loading
