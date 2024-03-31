import { type IntRange } from '@/src/types/intRange'
import { getSearchParam } from '@/utils/getSearchParam'

export const getRgbaFromURL = () => {
  // getting color from url
  const urlColor = getSearchParam('color') as
    | `${string}-${string}-${string}-${string}`
    | undefined

  if (!urlColor)
    return {
      r: 0 as IntRange<0, 256>,
      g: 0 as IntRange<0, 256>,
      b: 0 as IntRange<0, 256>,
      a: 0 as IntRange<0, 2>,
    }

  const urlColorSplited = urlColor.split('-').map((item, index) => {
    if (index === 3) {
      if (item.replace(/\..*/, '').length > 1) return 1
      return parseFloat(item) ?? 1
    }
    if (item.length > 3) return 0

    return parseInt(item) ?? 0
  })

  const r = urlColorSplited[0] as IntRange<0, 256>
  const g = urlColorSplited[1] as IntRange<0, 256>
  const b = urlColorSplited[2] as IntRange<0, 256>
  const a = urlColorSplited[3] as IntRange<0, 2>

  return {
    r,
    g,
    b,
    a,
  }
}
