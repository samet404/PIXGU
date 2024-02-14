import NavLink from './NavLink'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

const NavLinkChat = () => {
  return (
    <NavLink href='/chat' icon={faMessage}/>
  )
}

export default NavLinkChat
