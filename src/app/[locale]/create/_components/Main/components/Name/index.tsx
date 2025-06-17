import { WholeWord } from 'lucide-react'
import Header from '../Header'
import { InputContainer } from './components/InputContainer'
import InputInfo from './components/InputContainer/components/InputInfo'
import type { LangObj } from '@/app/[locale]/create/lang'

export const Name = ({ langObj }: Props) => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header name={langObj.heading} icon={<WholeWord className='size-7' strokeWidth={2} />} />
      <InputContainer placeholder={langObj.placeholder}>
        <InputInfo />
      </InputContainer>
    </div>
  )
}


type Props = {
  langObj: LangObj['main']['name']
}