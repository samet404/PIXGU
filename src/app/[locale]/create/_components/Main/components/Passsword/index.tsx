import Header from '../Header'
import { InputContainer } from './components/Input'
import { IsPublic } from './components/IsPublic'
import { Info } from './components/Info'
import type { LangObj } from '@/app/[locale]/create/lang'
import { KeyRound, Lock } from 'lucide-react'

export const Password = ({ langObj }: Props) => {
  return (
    <div className="flex flex-col justify-between rounded-md bg-gradient-to-r from-[#ffffff3b] to-[#ffffff2e] shadow-[0_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <Header name="Password" icon={<Lock className='size-7' strokeWidth={2} />} />
      <InputContainer generateBtnText={langObj.generateBtnText} placeholder={langObj.placeholder}>
        <IsPublic />
        <Info />
      </InputContainer>
    </div>
  )
}

type Props = {
  langObj: LangObj['main']['password']
}