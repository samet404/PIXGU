import dynamic from 'next/dynamic'

const AblyProviders = dynamic(() => import('./_components/AblyProviders'), {
  ssr: false,
})

const WebRTC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex flex-row gap-2 text-sm">
        <AblyProviders />
      </div>
    </div>
  )
}
export default WebRTC
