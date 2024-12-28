import type { Locale } from '@/types/locale'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./components/Content').then(m => m.Content))

export const LanguageDropdown = ({ locale }: Props) => {
  return <Content locale={locale} />
}

type Props = {
  locale: Locale
}

