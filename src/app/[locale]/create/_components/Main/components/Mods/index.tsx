import { Blocks } from 'lucide-react'
import Header from '../Header'
import type { LangObj } from '@/app/[locale]/create/lang'

export const Mods = ({ langObj }: Props) => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header name={langObj.heading} icon={<Blocks className='size-7' strokeWidth={2} />} className='rounded-md' />
      <div className='py-2 h-[4rem] flex items-center justify-center'>
        <div className='text-yellow-300'>{langObj.comingSoonText}</div>
      </div>
    </div>
  )
}

type Props = {
  langObj: LangObj['main']['mods']
}