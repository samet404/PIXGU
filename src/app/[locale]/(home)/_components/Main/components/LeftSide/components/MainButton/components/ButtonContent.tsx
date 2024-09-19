import { Fragment } from 'react'

export const ButtonContent = ({ name, description, icon }: Props) => {
  return (
    <Fragment>
      <div className="flex flex-row items-center gap-[0.35rem]">
        {icon}
        <div className="text-2xl font-[700] text-[rgba(255,255,255,0.5)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]">
          {name}
        </div>
      </div>
      <div className="w-full rounded-md bg-gradient-to-r from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.1)] p-2 text-left leading-5 text-[rgba(255,255,255,0.6)] shadow-[0_0px_10px_0px_rgba(0,0,0,0.2)]">
        {description}
      </div>
    </Fragment>
  )
}

type Props = {
  name: string
  description: string
  icon: JSX.Element
}
