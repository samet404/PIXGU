import { clsxMerge } from '@/utils/clsxMerge'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const SocialLink = ({ href, faIcon, className }: Props) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className={clsxMerge(`size-7 text-[rgba(255,255,255,0.59)] hover:text-[#ffffffbb] ${className}`)}>
        <FontAwesomeIcon icon={faIcon} className="!h-full w-full" />
      </div>
    </Link>
  )
}

export default SocialLink

type Props = {
  className?: string
  href: string
  faIcon: IconDefinition
}
