import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./Client'), { ssr: false })

const Presence = () => <Client />

export default Presence
