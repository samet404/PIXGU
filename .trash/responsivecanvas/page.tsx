import { Canvas } from './Canvas'

const Responsivecanvas = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-48 w-48 bg-cyan-400">
        <Canvas />
      </div>
    </div>
  )
}

export default Responsivecanvas
