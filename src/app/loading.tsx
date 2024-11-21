import { Svg } from '@/components/Svg'

const loading = () => {
  return (
    <div className="flex h-full w-full animate-fade items-center justify-center bg-[#03172a]">
      <Svg
        src='spinner-one-third-svgrepo-com.svg'
        alt="spinner"
        className="size-11 animate-spin animate-infinite"
      />
    </div>
  )
}

export default loading
