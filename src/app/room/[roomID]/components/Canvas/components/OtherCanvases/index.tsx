import OtherPlayersCanvases from './components/OtherPlayersCanvases'
import UserCanvas from './components/UserCanvas'

const OtherCanvases = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <UserCanvas />
      <OtherPlayersCanvases />
    </div>
  )
}
export default OtherCanvases
