import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const SocialLink = ({ href, faIcon }: Props) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="size-7 text-[rgba(255,255,255,0.59)] hover:text-[#ffffffbb]">
        <FontAwesomeIcon icon={faIcon} className="!h-full w-full" />
      </div>
    </Link>
  )
}

export default SocialLink

type Props = {
  href: string
  faIcon: IconDefinition
}
