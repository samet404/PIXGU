import { canvasPenThicknessAtom } from '@/src/app/room/[roomID]/atoms'
import { useSetAtom } from 'jotai'
import { type MutableRefObject } from 'react'

type ButtonsProps = {
  inputRef: MutableRefObject<HTMLInputElement | null>
}

const Buttons = ({ inputRef }: ButtonsProps) => {
  const setCanvasPenThickness = useSetAtom(canvasPenThicknessAtom)

  const increment = () => {
    inputRef.current!.value = (parseInt(inputRef.current!.value) + 1).toString()
    setCanvasPenThickness((prev) => prev + 1)
  }

  const decrement = () => {
    inputRef.current!.value = (parseInt(inputRef.current!.value) - 1).toString()
    setCanvasPenThickness((prev) => prev - 1)
  }

  return (
    <div className="flex w-full flex-row text-[rgba(0,0,0,0.7)]">
      <button
        onMouseMove={() => console.log('benim kocaman popom var')}
        onClick={() => increment()}
        className="w-1/2 rounded-l-md bg-[rgba(255,255,255,0.8)] hover:opacity-50"
      >
        +
      </button>
      <button
        onClick={() => decrement()}
        className="w-1/2 rounded-r-md bg-[rgba(255,255,255,0.8)] hover:opacity-50"
      >
        -
      </button>
    </div>
  )
}

export default Buttons
