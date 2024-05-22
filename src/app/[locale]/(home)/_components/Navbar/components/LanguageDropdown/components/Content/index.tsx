import OpenerBtn from './components/OpenerBtn'
import Dropdown from './components/DropdownContent'
import { getLocale } from '@/context/server'

const Content = () => {
  return (
    <div className="relative z-10">
      <OpenerBtn lang={getLocale()} />
      <Dropdown />
    </div>
  )
}

export default Content
