'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { type ComponentProps } from 'react'
import Spinner from '@/components/Spinner'

export const SettingsCheckbox = ({
  name,
  description,
  className,
  isLoading,
  isChecked,
  ...rest
}: Props) => {
  console.log(name, isChecked)
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-row items-center gap-5">
        <div className="font-[900] text-[#000000b1]">{name}</div>

        <div className="flex flex-row items-center gap-2">
          <button {...rest} disabled={isLoading || isChecked === undefined}>
            <div
              className={clsxMerge(
                `relative inline-block h-8 w-16 ${className}`,
                {
                  'cursor-not-allowed opacity-50':
                    isLoading || isChecked === undefined,
                },
              )}
            >
              <span
                className={clsxMerge(
                  `absolute inset-0 cursor-pointer rounded-lg bg-[#eee] shadow-[0_0px_0.2rem_1px_#dfd9d9] transition-[0.4s] before:absolute before:bottom-[0.7rem] before:left-[0.3rem] before:h-[1.5rem] before:w-[1.4rem] before:rounded-md before:bg-rose-400 before:shadow-[0_0px_0.3rem_1px_#bcb4b4] before:transition-[0.4s] before:content-[''] hover:before:bottom-[0.5rem] hover:before:shadow-[0_0px_0.2rem_0px_#bcb4b4] `,
                  {
                    'before:translate-x-8 before:bg-emerald-400': isChecked,
                  },
                )}
              ></span>
            </div>
          </button>
          {isLoading && <Spinner className="size-8" />}
        </div>
      </div>

      <div className="rounded-md bg-[#ffffff5e] p-2 text-sm text-[#0000009b]">
        {description}
      </div>
    </div>
  )
}

type Props = {
  isLoading: boolean
  name: string
  description: string
  className?: string
  isChecked: boolean | undefined
} & ComponentProps<'button'>
