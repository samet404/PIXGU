import { type IntRange } from '@/src/types/intRange'
import { getSearchParam } from '@/utils/getSearchParam'

export const getRgbAndOpacity = () => {
  // getting color from url
  const canvasColor = getSearchParam('color') as
    | `rgba/${string}-${string}-${string}-${string}`
    | undefined

  const rgb = ((): `rgb(${string}, ${string}, ${string})` => {
    if (!canvasColor) return `rgb(0, 0, 0)`

    const canvasColorSplit = canvasColor.replace('rgba/', '').split('-')
    const r = canvasColorSplit[0] ?? '0'
    const g = canvasColorSplit[1] ?? '0'
    const b = canvasColorSplit[2] ?? '0'

    return `rgb(${r}, ${g}, ${b})`
  })()

  const opacity = ((): IntRange<0, 2> => {
    if (!canvasColor) return 1

    const opacityFromUrl = parseFloat(
      canvasColor.replace('rgba/', '').split('-')[3] ?? '1',
    )

    if (opacityFromUrl > 1) return 1
    if (opacityFromUrl < 0) return 0

    return opacityFromUrl as IntRange<0, 2>
  })()

  return { rgb, opacity }
}
