import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const Settings = () => {
  return (
    <Link
      href="/settings"
      className="flex h-10 w-10 items-center justify-center rounded-full"
    >
      <FontAwesomeIcon
        icon={faGear}
        className="text-3xl text-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.2)]"
      />
    </Link>
  )
}

export default Settings
