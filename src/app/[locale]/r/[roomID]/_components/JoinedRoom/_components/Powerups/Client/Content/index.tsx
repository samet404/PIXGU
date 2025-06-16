import { CardContent } from './components/CardContent'
import type { LangObj } from '../../lang'
import { useCurrentPanel } from '@/zustand/store/useCurrentPanel'

export const Content = ({ langObj }: Props) => {
  const closePanel = useCurrentPanel(s => s.setPanel)

  return (
    <section
      className='absolute left-0 top-0  z-[60] flex h-full w-full animate-fade bg-[#00000073] backdrop-saturate-0 animate-duration-200'
    >
      <div className='w-full h-full relative flex-row items-start justify-center gap-5 flex'>
        <div onMouseDown={() => closePanel(null)} className="h-[50%] top-0 left-0 absolute w-full"></div>
        <div
          style={{
            backgroundImage:
              'radial-gradient(at 0% 100%, hsla(60,98%,49%,1) 0px, transparent 50%), radial-gradient(at 100% 100%, #ffe600ff 0px, transparent 50%)',
          }}
          className='flex relative justify-center items-end w-full h-full'>
          <div className="relative  flex w-full h-full justify-center items-center">
            <CardContent langObj={langObj} />
          </div>
        </div>
        <div className='absolute right-0 top-1/2 -translate-y-1/2 transform-gpu origin-right animate-fade'>
          <div className='rotate-90 whitespace-nowrap  selection:!bg-[#ffffff19]  text-[3rem] text-[#ffffffdc] drop-shadow-[0_0px_6px_#ffff00ff]'>
            POWER-UPS
          </div>
        </div>
      </div>
    </section>
  )
}

type Props = {
  langObj: LangObj
}