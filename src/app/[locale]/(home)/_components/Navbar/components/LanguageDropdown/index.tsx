import { getIsLogged } from '@/context/server'
import dynamic from 'next/dynamic'

const Preview = dynamic(() => import('./components/Preview'))
const Content = dynamic(() => import('./components/Content'))

const LanguageDropdown = () => {
  const isLogged = getIsLogged()

  if (!isLogged) return <Preview />
  return <Content />
}
export default LanguageDropdown
