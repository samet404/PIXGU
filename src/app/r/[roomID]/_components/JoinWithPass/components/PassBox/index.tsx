import { GeistSans } from 'geist/font/sans'
import Content from './components/Content'

const PassBox = () => {
  return (
    <div className="flex h-full w-full overflow-y-scroll py-10 xxs:flex-col lg:items-center lg:justify-center">
      <div className="flex xxs:w-full xxs:justify-center">
        <div className="flex flex-col items-center gap-9 rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 p-4 shadow-[0_0px_30px_1px_#10b981] selection:!bg-[#10b981]">
          <div
            className={`${GeistSans.className} break-words rounded-lg bg-gradient-to-tr from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.14)] to-[rgba(0,0,0,0.3)] bg-clip-text text-[1.7rem] font-[800] leading-8 text-transparent drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] `}
          >
            PASSWORD
          </div>

          <Content />
        </div>
      </div>
    </div>
  )
}

export default PassBox
