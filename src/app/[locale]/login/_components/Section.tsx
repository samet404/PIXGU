import type { PropsWithChildren } from 'react'

export const Section = ({ title, children }: Props) => {
  return (
    <section className="justify-left flex w-full animate-fade-up flex-col gap-2 rounded-md  bg-[rgba(255,255,255,0.3)] px-2 pb-2 pt-2 font-[400] text-[rgba(255,255,255,0.7)]">
      <div className="pl-1 font-[500]">{title}</div>
      {children}
    </section>
  )
}

type Props = PropsWithChildren<{
  title: string
}>
