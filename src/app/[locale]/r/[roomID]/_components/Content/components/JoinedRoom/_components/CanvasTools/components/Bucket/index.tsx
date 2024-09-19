'use client'

import Image from 'next/image'
import { Tool } from '../Tool'
import bucket from '@/svg/bucket-svgrepo-com.svg'

export const Bucket = () => {
  return (
    <Tool
      classNameConditions={{
        'bg-[#ffffff82]': 'isOpen',
      }}
      onClick={() => {}}
      icon={<Image src={bucket} alt="eye-dropper" className="opacity-50" />}
    />
  )
}
