import { clsxMerge } from '@/utils/clsxMerge'
import type { ComponentProps } from 'react'
export const Status = ({ text, theme, ...rest }: Props) => {
  return (
    <div
      className={clsxMerge(
        'flex flex-row items-center gap-3 rounded-full bg-[rgba(52,211,153,0.20)]   duration-[2000ms]',
        {
          'bg-[rgba(52,211,153,0.2)]': theme === 'green',
          'bg-[rgba(248,113,113,0.2)]': theme === 'red',
          'animate-pulse bg-[rgba(250,204,21,0.2)] animate-infinite':
            theme === 'yellow',
          'p-1': !text,
          'py-[0.35rem] pl-[0.35rem] pr-3': text,
        },
      )}
      {...rest}
    >
      <div
        className={clsxMerge('size-3 rounded-full duration-[2000ms]', {
          'bg-emerald-400': theme === 'green',
          'bg-red-400': theme === 'red',
          'bg-yellow-400': theme === 'yellow',
        })}
      ></div>
      {text && (
        <div className="text-[0.9rem] leading-3 text-[#ffffff84]">{text}</div>
      )}
    </div>
  )
}

type Props = {
  text: string
  theme: 'green' | 'red' | 'yellow'
} & ComponentProps<'div'>
