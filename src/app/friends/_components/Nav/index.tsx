import NavLinkFriends from './components/NavLinkFriends'
import NavLinkSearch from './components/NavLinkSearch'
import NavLinkChat from './components/NavLinkChat'

const Nav = () => {
  return (
    <nav className="absolute bottom-[1rem] flex h-auto w-full items-end justify-center gap-[10%]">
      <NavLinkFriends />
      <NavLinkSearch />
      <NavLinkChat />
    </nav>
  )
}

export default Nav
