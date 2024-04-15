import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./_components/Client'), {
  ssr: false,
})

const webRTCTEST2 = () => {
  return <Client />
}
export default webRTCTEST2
