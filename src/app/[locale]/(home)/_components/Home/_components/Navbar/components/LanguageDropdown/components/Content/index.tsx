import OpenerBtn from './components/OpenerBtn'
import Dropdown from './components/DropdownContent'
import type { Locale } from '@/types/locale'

export const Content = ({ locale }: Props) => {
  return (
    <div className="group relative z-10">
      <OpenerBtn lang={locale} />
      <Dropdown />
    </div>
  )
}

type Props = {
  locale: Locale
}