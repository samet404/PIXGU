import spinner from '@/svg/spinner-one-third-svgrepo-com.svg'
import Image from 'next/image'

const loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <Image
        src={spinner}
        alt="spinner"
        className="w-[5rem] animate-spin animate-infinite animate-ease-in-out"
      />
    </div>
  )
}

export default loading
