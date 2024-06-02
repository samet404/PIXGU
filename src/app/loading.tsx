import spinner from '@/svg/spinner-one-third-svgrepo-com.svg'
import Image from 'next/image'

const loading = () => {
  return (
    <div className="flex h-full w-full animate-fade flex-col items-center justify-center gap-4 bg-[hsla(220,39%,10%,1)]">
      <Image
        src={spinner}
        alt="spinner"
        width={100}
        height={100}
        className="animate-spin animate-infinite animate-ease-in-out"
      />

      <div className="flex flex-col items-center gap-3">
        <div className="text-white"> Did you know ?</div>
        <div className="text-sm text-[#ffffffb2]">
          this game made by only one person
        </div>
      </div>
    </div>
  )
}

export default loading
