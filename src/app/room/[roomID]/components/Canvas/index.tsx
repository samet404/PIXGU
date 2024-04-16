import Download from './components/Download'
import OtherCanvases from './components/OtherCanvases'
import AblyProviderComponent from './components/AblyProviderComponent'
import DrawPerSecondDisplay from './components/DrawPerSecondDisplay'

const Canvas = () => {
  return (
    <AblyProviderComponent>
      <div className="flex select-none flex-col items-center gap-[0.1rem]">
        <DrawPerSecondDisplay />
        <div className="animate-fade rounded-lg bg-[#ffffff68] p-2 shadow-[0_0px_13px_0px_rgba(0,0,0,0.4)] ">
          <div className="relative w-full  cursor-crosshair rounded-md bg-white">
            <canvas
              id="main-canvas"
              width={600}
              height={600}
              className="rounded-lg"
            />
            <OtherCanvases />
          </div>
        </div>
        <div className="flex flex-row items-center">
          <Download />
        </div>
      </div>
    </AblyProviderComponent>
  )
}

export default Canvas
