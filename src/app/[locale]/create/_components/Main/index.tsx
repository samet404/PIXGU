import { Inter } from 'next/font/google'
import { Password } from './components/Passsword'
import { Name } from './components/Name'
import { Mods } from './components/Mods'
import type { LangObj } from '../../lang'

const inter500 = Inter({
  subsets: ['latin'],
  weight: ['600', '500'],
})

export const Main = ({ langObj }: Props) => {
  return (
    <main
      className={`${inter500.className} z-20 flex h-full w-full flex-col gap-2 p-2`}
    >
      <Name langObj={langObj.name} />
      <Mods langObj={langObj.mods} />
      <Password langObj={langObj.password} />
    </main>
  )
}

type Props = {
  langObj: LangObj['main']
}