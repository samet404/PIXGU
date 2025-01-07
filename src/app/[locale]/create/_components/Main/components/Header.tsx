import { clsxMerge } from '@/utils/clsxMerge'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['600'],
})

const Header = ({ icon, name, className }: { icon: IconDefinition; name: string, className?: string }) => {
  return (
    <div className={clsxMerge(`flex flex-row items-center gap-2 rounded-t-md bg-[#ffffff34] p-2 text-[rgba(255,255,255,0.7)] ${className}`)}>
      <div className="size-7">
        <FontAwesomeIcon
          icon={icon}
          className="!h-full w-full drop-shadow-md"
        />
      </div>
      <div
        className={`${urbanist.className} text-[1.2rem] leading-4 drop-shadow-md`}
      >
        {name}
      </div>
    </div>
  )
}

export default Header
