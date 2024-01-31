import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavLink from './NavLink'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

const NavLinkChat = () => {
  return (
    <NavLink href='/friends/chat'>
      <FontAwesomeIcon icon={faMessage} color="rgba(255,255,255,0.8)" />
    </NavLink>
  )
}

export default NavLinkChat
