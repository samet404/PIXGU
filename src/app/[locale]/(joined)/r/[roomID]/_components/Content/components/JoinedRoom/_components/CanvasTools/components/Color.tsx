'use client'

import { usePainterTool } from '@/zustand/store'
import { useAtom } from 'jotai'
import { selectedColorAtom } from '../atoms'
import { clsxMerge } from '@/utils/clsxMerge'

export const Color = ({ isColor2 }: Props) => {
  const color = usePainterTool((s) => s.with[isColor2 ? 'color2' : 'color1'])
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom)

  return (
    <div className={clsxMerge('rounded-full border-[0.1rem] border-[#ffffff52]', {
      'border-[#ffffffaf]': selectedColor === (isColor2 ? 1 : 0),

    })}>

      <div className='bg-white rounded-full'>
        <div
          onMouseDown={() => setSelectedColor(isColor2 ? 1 : 0)}
          style={{
            backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`,
          }}
          className={'size-[1.5rem] rounded-full'}
        ></div>
      </div>
    </div>
  )
}

type Props = {
  isColor2?: boolean
}