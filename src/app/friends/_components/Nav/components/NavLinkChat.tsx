import NavLink from './NavLink'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

const NavLinkChat = () => {
  return (
    <NavLink href='/friends/chat' icon={faMessage}/>
  )
}

export default NavLinkChat
