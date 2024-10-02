import Image from 'next/image'
import { Tool } from '../Tool'

export const Circle = () => {
  return (
    <Tool
      icon={
        <div className="size-[90%] rounded-full border-[0.2rem] border-[rgba(255,255,255,0.5)]"></div>
      }
    ></Tool>
  )
}
