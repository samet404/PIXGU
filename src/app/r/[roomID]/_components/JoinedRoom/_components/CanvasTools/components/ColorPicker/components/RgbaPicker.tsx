import { getSearchParam } from '@/utils/getSearchParam'
import { setSearchParam } from '@/utils/setSearchParam'
import { useEffect, useState } from 'react'
import { type RgbaColor, RgbaColorPicker } from 'react-colorful'

const RgbaPicker = () => {
  const [initColor, setInitColor] = useState<{
    r: number
    g: number
    b: number
    a: number
  }>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  })

  const handleOnChange = (newColor: RgbaColor) => {
    const { r, g, b, a } = newColor

    setSearchParam('color', `${r}-${g}-${b}-${a}`)
  }

  useEffect(() => {
    const colorSearchParam = getSearchParam('color')

    if (colorSearchParam) {
      const splitedColor = colorSearchParam.split('-')

      const r = splitedColor[0] ? parseInt(splitedColor[0]) : 0
      const g = splitedColor[1] ? parseInt(splitedColor[1]) : 0
      const b = splitedColor[2] ? parseInt(splitedColor[2]) : 0
      const a = splitedColor[3] ? parseFloat(splitedColor[3]) : 1

      setInitColor({
        r: r,
        g: g,
        b: b,
        a: a,
      })
    }
  }, [])

  return (
    <RgbaColorPicker
      style={{
        width: '100%',
        height: '8rem',
        filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.5))',
      }}
      color={initColor}
      className="w-full animate-fade rounded-md bg-[#ffffff7b]"
      onChange={handleOnChange}
    />
  )
}

export default RgbaPicker
