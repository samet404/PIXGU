import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'

const Header = ({ icon, name }: { icon: IconDefinition; name: string }) => {
  return (
    <div className="flex  flex-row items-center gap-2 rounded-t-md bg-[#ffffff34] p-2 text-[rgba(255,255,255,0.7)] ">
      <FontAwesomeIcon
        icon={icon}
        className="text-[1.5rem] drop-shadow-md"
        fontSize={25}
      />
      <div className="leading-4 drop-shadow-md">{name}</div>
    </div>
  )
}

export default Header
