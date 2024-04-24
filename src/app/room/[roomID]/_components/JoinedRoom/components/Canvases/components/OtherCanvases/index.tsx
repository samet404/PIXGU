import GridCanvas from './components/GridCanvas'
import dynamic from 'next/dynamic'

const Draft = dynamic(() => import('./components/Draft'), { ssr: false })

const OtherCanvases = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <GridCanvas />
      <Draft />
    </div>
  )
}
export default OtherCanvases
