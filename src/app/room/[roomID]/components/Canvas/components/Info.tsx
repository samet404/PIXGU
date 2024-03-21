'use client'

import { useAtomValue } from 'jotai'
import { infoAtom } from '../atoms'

const Info = () => {
  const info = useAtomValue(infoAtom)

  if (!info) return <div>no info</div>
  return (
    <div className="flex flex-col gap-2 text-[0.5rem] text-white">
      <div>{info.color.r}</div>
      <div>{info.color.g}</div>
      <div>{info.color.b}</div>
      <div>{info.color.a}</div>
      <div>{info.thickness}</div>
      <div>
        {info.lines.map((line, i) => {
          return (
            <div key={i}>
              {line.x}, {line.y}
            </div>
          )
        })}
      </div>
      <div>{info.lineCap}</div>
    </div>
  )
}
export default Info
