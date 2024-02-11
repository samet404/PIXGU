import NavLinkFriends from './components/NavLinkFriends'
import NavLinkSearch from './components/NavLinkSearch'
import NavLinkChat from './components/NavLinkChat'
import NavLinkRequests from './components/NavLinkRequests'

const Nav = () => {
  return (
    <nav className="absolute bottom-[1rem] flex h-auto w-full  justify-center">
      <div className=" flex flex-row rounded-[0.600rem] border-[0.2rem] border-[#ffffff82] ">
        <NavLinkFriends />
        <NavLinkSearch />
        <NavLinkRequests />
        <NavLinkChat />
      </div>
    </nav>
  )
}

export default Nav
