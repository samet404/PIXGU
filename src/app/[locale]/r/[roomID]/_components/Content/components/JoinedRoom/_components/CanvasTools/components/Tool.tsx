import { clsxMerge } from '@/utils/clsxMerge'
import type { ClassDictionary } from 'clsx'
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'

export const Tool = ({
  icon,
  className,
  classNameConditions,
  children,
  ...rest
}: Props) => {
  return (
    <button
      className={clsxMerge(
        ` group flex h-full w-full  items-center justify-center gap-2 rounded-md bg-[rgba(255,255,255,0.2.2)] p-1 ${className} `,
        classNameConditions ?? {},
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}

type Props = PropsWithChildren<{
  className?: string
  classNameConditions?: ClassDictionary
  icon: ReactNode
}> &
  ComponentProps<'button'>
