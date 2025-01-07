import { Download } from './components/Download'
import { Powerups } from './components/Powerups'
import { Logs } from './components/Logs'


export const LeftNav = () => {
  return (
    <nav
      className={`flex flex-row items-start gap-2 rounded-md bg-[#ffffff27] p-1`}
    >
      <Logs />
      <Download />
      <Powerups />
    </nav>
  )
}
