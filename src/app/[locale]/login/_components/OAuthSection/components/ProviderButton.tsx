import googleIcon from '@/svg/google-svgrepo-com.svg'
import {
  faDiscord,
  faGithub,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { type ComponentProps } from 'react'
import Image from 'next/image'

type ProviderButtonType = {
  providerName: string
} & ComponentProps<'button'>
1
const ProviderButton = ({ providerName }: ProviderButtonType) => {
  const bgColor = (() => {
    switch (providerName) {
      case 'github':
        return 'bg-[rgb(20,20,20)]'
      case 'spotify':
        return 'bg-[#1CD45E]'
      case 'discord':
        return 'bg-[#5865F2]'
      case 'google':
        return 'bg-[#ffffff]'
      default:
        return 'COLOR ERROR'
    }
  })()

  const iconSize = 35
  const iconColor = 'rgba(255,255,255,0.85)'

  const icon = (() => {
    switch (providerName) {
      case 'github':
        return (
          <FontAwesomeIcon
            icon={faGithub}
            fontSize={iconSize}
            color={iconColor}
          />
        )
      case 'spotify':
        return (
          <FontAwesomeIcon
            icon={faSpotify}
            fontSize={iconSize}
            color={iconColor}
          />
        )
      case 'discord':
        return (
          <FontAwesomeIcon
            icon={faDiscord}
            fontSize={iconSize}
            color={iconColor}
          />
        )
      case 'google':
        return <Image src={googleIcon} alt="google icon" />
      default:
        return 'ICON ERROR'
    }
  })()

  return (
    <Link href={`/login/${providerName}`}>
      <button
        className={`${bgColor} flex aspect-square h-12 w-12 items-center justify-center rounded-lg  p-1 shadow-[0_0px_10px_0px_rgba(0,0,0,0.8)] drop-shadow-2xl`}
      >
        {icon}
      </button>
    </Link>
  )
}

export default ProviderButton
