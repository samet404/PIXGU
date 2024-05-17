import spinner from '@/svg/spinner-one-third-svgrepo-com.svg'
import Image from 'next/image'

const loading = () => {
  return (
    <div className="flex h-full w-full animate-fade items-center justify-center bg-[hsla(220,39%,10%,1)]">
      <Image
        src={spinner}
        alt="spinner"
        width={100}
        height={100}
        className="animate-spin animate-infinite animate-ease-in-out"
      />
    </div>
  )
}

export default loading
