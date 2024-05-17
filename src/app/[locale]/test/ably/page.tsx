import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./_components/Client'), {
  ssr: false, // this ensures that server side rendering is never used for this component
})

const Ably = () => {
  return (
    <div>
      <Client />
    </div>
  )
}
export default Ably
