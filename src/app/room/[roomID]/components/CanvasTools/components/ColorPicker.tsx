'use client'

import { useAtom } from 'jotai'
import { RgbaColorPicker } from 'react-colorful'
import { canvasColorAtom } from '../../atoms'

const ColorPicker = () => {
  const [canvasColor, setCanvasColor] = useAtom(canvasColorAtom)

  return (
    <RgbaColorPicker
      style={{
        width: '100%',
        height: '8rem',
        filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.5))',
      }}
      color={canvasColor}
      className="w-full"
      onChange={setCanvasColor}
    />
  )
}

export default ColorPicker
