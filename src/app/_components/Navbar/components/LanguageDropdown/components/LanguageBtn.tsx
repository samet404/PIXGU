import { type ComponentProps } from 'react'

type LanguageBtnProps = {
  name: string
} & ComponentProps<'button'>

const LanguageBtn = ({ name, ...rest }: LanguageBtnProps) => {
  return (
    <button className="rounded-md bg-[rgba(0,0,0,0.3)] p-1 text-[rgba(255,255,255,0.5)]" {...rest}>
      {name}
    </button>
  )
}

export default LanguageBtn
