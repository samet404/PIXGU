import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

type LinkProps = {
  href: string
  fontAwesomeIcon?: IconDefinition
  Image?: JSX.Element
}

const ToLink = ({ href, fontAwesomeIcon, Image }: LinkProps) => {
  return (
    <Link
      href={href}
      className={
        'flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff7e] p-2 duration-150 hover:bg-[#ffffffba]'
      }
    >
      {fontAwesomeIcon ? (
        <FontAwesomeIcon
          icon={fontAwesomeIcon}
          color={'#2d9dff'}
          className="!h-full w-full"
        />
      ) : null}
      {Image ? Image : null}
    </Link>
  )
}
export default ToLink
