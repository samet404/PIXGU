import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./components/Content'))

const LanguageDropdown = () => {
  return <Content />
}
export default LanguageDropdown
