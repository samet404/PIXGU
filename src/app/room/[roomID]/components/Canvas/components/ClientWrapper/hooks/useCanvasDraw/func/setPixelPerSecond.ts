import { type MutableRefObject } from 'react'
import { type PixelPerSecond } from '../types'

export const setPixelPerSecond = (
  pixelPerSecondRef: MutableRefObject<PixelPerSecond>,
) => {
  const pixelPerSecond = pixelPerSecondRef.current
  const lastIndex = pixelPerSecond.length - 1

  if (pixelPerSecond.length == 0) {
    pixelPerSecondRef.current.push({
      Date: new Date(),
      count: 1,
    })
  } else {
    const lastDate = pixelPerSecond[lastIndex]?.Date
    const currentDate = new Date()

    // if 1 second passed
    if (currentDate.getTime() - lastDate!.getTime() > 1000) {
      console.log(
        pixelPerSecond[lastIndex]!.count + ' pixels drawn in 1 second',
      )

      pixelPerSecondRef.current.push({
        Date: new Date(),
        count: 0,
      })
    } else {
      pixelPerSecondRef.current[lastIndex]!.count += 1
    }
  }
}
