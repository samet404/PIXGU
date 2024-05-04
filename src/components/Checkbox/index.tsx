'use client'

import { type WritableAtom } from 'jotai'
import Input from './_components/Input'
import { type ComponentProps } from 'react'

const Checkbox = ({ atom, ...props }: Props) => {
  return (
    <div className="">
      <label className="relative inline-block h-8 w-16">
        <Input atom={atom} {...props} />
        <span className="absolute inset-0 cursor-pointer rounded-lg bg-[#eee] shadow-[0_0px_0.2rem_1px_#dfd9d9] transition-[0.4s] before:absolute before:bottom-[0.7rem] before:left-[0.3rem] before:h-[1.5rem] before:w-[1.4rem] before:rounded-md before:bg-[salmon] before:shadow-[0_0px_0.3rem_1px_#bcb4b4] before:transition-[0.4s] before:content-[''] hover:before:bottom-[0.5rem] hover:before:shadow-[0_0px_0.2rem_0px_#bcb4b4] peer-checked/checkbox:before:translate-x-8 peer-checked/checkbox:before:bg-[lightgreen]"></span>
      </label>
    </div>
  )
}

export default Checkbox

type Props = {
  atom: WritableAtom<boolean | null, any, void>
} & ComponentProps<'input'>
