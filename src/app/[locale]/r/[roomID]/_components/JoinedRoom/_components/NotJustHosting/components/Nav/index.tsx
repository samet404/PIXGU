import BtnLeave from './components/BtnLeave'

const Nav = () => {
  return (
    <nav className="flex w-full animate-fade-down flex-row items-center justify-between py-1 pl-2 pr-4 shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]">
      <div className="flex flex-row items-center gap-1">
        <div className="size-3 rounded-full bg-emerald-400"></div>
      </div>
      <BtnLeave />
    </nav>
  )
}
export default Nav
