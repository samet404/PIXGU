import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import NavLink from './NavLink'

const NavLinkFriends = () => {
  return (
    <NavLink href='/friends'>
      <FontAwesomeIcon icon={faUserGroup} color="rgba(255,255,255,0.8)" />
    </NavLink>
  )
}

export default NavLinkFriends
