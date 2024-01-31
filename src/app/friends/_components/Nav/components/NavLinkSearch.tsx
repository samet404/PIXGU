import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavLink from './NavLink'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavLinkSearch = () => {
  return (
    <div className="h-[5rem] w-11">
      <NavLink href="/friends/search">
        <FontAwesomeIcon icon={faSearch} color="rgba(255,255,255,0.8)" />
      </NavLink>
    </div>
  )
}

export default NavLinkSearch
