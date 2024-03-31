import GridCanvas from './components/GridCanvas'
import OtherPlayersCanvases from './components/OtherPlayersCanvases'
import Draft from './components/Draft'

const OtherCanvases = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <Draft />
      <GridCanvas />
    </div>
  )
}
export default OtherCanvases
