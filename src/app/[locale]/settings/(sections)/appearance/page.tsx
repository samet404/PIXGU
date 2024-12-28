import type { Locale } from '@/types/locale'
import SectionWrapper from '../_components/SectionWrapper'
import { CustomCursor } from './_components/customCursor'
import { getLangObj } from './lang'

const Appearance = async ({ params }: Props) => {
  const { locale } = await params
  const { heading, customCursorName, customCursorDesc } = await getLangObj(locale)

  return (
    <SectionWrapper text={heading}>
      <div className="flex flex-col gap-2">
        <CustomCursor name={customCursorName} description={customCursorDesc} />
      </div>
    </SectionWrapper>
  )
}

export default Appearance

type Props = {
  params: Promise<{
    locale: Locale
  }>
}