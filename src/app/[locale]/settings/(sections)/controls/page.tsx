import type { Locale } from '@/types'
import SectionWrapper from '../_components/SectionWrapper'
import { Alert } from './_components/Alert'
import { Items } from './_components/Items'
import { RecordBinding } from './_components/RecordBinding'
import { getLangObj } from './lang'

const Controls = async ({ params }: Props) => {
  const { locale } = await params
  const { heading, description, keys } = await getLangObj(locale)

  return (
    <SectionWrapper text={heading}>
      <div className="flex flex-col gap-2 items-start">
        <div className='pb-2 text-sm text-[#0000009b]'>
          {description}
        </div>

        <Items names={keys} />
        <Alert />
      </div>
      <RecordBinding />
    </SectionWrapper>
  )
}

export default Controls

type Props = {
  params: Promise<{
    locale: Locale
  }>
}