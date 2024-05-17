import BtnLeave from './components/BtnLeave'

const Nav = () => {
  return (
    <nav className="flex w-full animate-fade-down flex-row items-center justify-between py-1 pl-2 pr-4">
      <div className="flex flex-row items-center gap-1">
        <div className="size-2 rounded-full bg-emerald-400"></div>
        <div className="text-[0.75rem] text-emerald-400">Online</div>
      </div>
      <BtnLeave />
    </nav>
  )
}
export default Nav
