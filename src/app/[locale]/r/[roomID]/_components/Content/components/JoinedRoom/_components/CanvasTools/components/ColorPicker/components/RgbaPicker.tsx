import { useRgba } from '@/zustand/store'
import { type RgbaColor, RgbaColorPicker } from 'react-colorful'

export const RgbaPicker = () => {
  const handleOnChange = (newColor: RgbaColor) =>
    useRgba.getState().set(newColor)

  return (
    <div className="absolute right-[22%] top-[4%] z-20 hidden h-[10rem] w-[12rem] group-hover:flex">
      <RgbaColorPicker
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.7))',
        }}
        color={{
          r: 0,
          g: 0,
          b: 0,
          a: 1,
        }}
        className="h-full w-full animate-fade rounded-md bg-[#ffffff7b] animate-duration-75"
        onChange={handleOnChange}
      />
    </div>
  )
}
