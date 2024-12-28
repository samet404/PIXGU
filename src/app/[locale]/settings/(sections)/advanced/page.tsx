import type { Locale } from '@/types/locale'
import SectionWrapper from '../_components/SectionWrapper'
import { ClearLocalstorage } from './components/ClearLocalstorage'
import { DeveloperMode } from './components/DeveloperMode'
import { getLangObj } from './lang'

const Advanced = async ({ params }: Props) => {
  const { locale } = await params
  const { heading, developerModeDesc, developerModeHeading, clearLocalstorageDesc, clearLocalstorageHeading } = await getLangObj(locale)

  return (
    <SectionWrapper text={heading}>

      <div className="flex flex-col gap-6">
        <DeveloperMode heading={developerModeHeading} description={developerModeDesc} />
        <ClearLocalstorage heading={clearLocalstorageHeading} description={clearLocalstorageDesc} />
        {/* <Count /> */}
      </div>
    </SectionWrapper>
  )
}

export default Advanced

type Props = {
  params: Promise<{
    locale: Locale
  }>
}
