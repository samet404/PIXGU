import { GeistSans } from 'geist/font/sans'
import { type ReactNode } from 'react'

/**
 * A wrapper for sections in the settings page
 */
const SectionWrapper = ({ text, children }: Props) => {
  return (
    <section className="flex h-full w-full animate-fade flex-col gap-6 p-1">
      <h1
        className={`${GeistSans.className} w-full rounded-md bg-slate-300 p-2 font-[900] text-[#0000009d]`}
      >
        {text}
      </h1>
      {children}
    </section>
  )
}

export default SectionWrapper

type Props = {
  text: string
  children: ReactNode
}
