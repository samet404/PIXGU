import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./_components/Client'), {
  ssr: false,
})

const SimplePeer = () => {
  return <Client />
}

export default SimplePeer
