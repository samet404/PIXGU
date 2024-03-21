import ClientWrapper from './components/ClientWrapper'
import Info from './components/Info'
import OtherCanvases from './components/OtherCanvases'

const Canvas = () => {
  return (
    <ClientWrapper>
      <div className="flex flex-col">
        <div className=" rounded-lg bg-[#ffffff68] p-2 shadow-[0_0px_13px_0px_rgba(0,0,0,0.4)] ">
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
        <Info />
      </div>
    </ClientWrapper>
  )
}

export default Canvas
