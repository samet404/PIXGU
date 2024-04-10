import dynamic from 'next/dynamic'

const Wrapper = dynamic(() => import('./_components/Wrapper'), { ssr: false })

const WebRTC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex flex-row gap-2 text-sm">
        <Wrapper />
      </div>
    </div>
  )
}
export default WebRTC
