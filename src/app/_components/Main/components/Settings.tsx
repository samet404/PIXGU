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
        className="hover:animate-rotate text-3xl text-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.45)] duration-300 hover:animate-spin hover:animate-duration-[4000ms] hover:animate-infinite"
      />
    </Link>
  )
}

export default Settings
