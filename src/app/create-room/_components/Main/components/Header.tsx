const Header = ({ icon, name }: { icon: JSX.Element; name: string }) => {
  return (
    <div className="flex  flex-row items-center gap-2 rounded-t-md bg-[#ffffff34] p-2 text-[rgba(255,255,255,0.7)] ">
      {icon}
      <div className="leading-4 drop-shadow-md">{name}</div>
    </div>
  )
}

export default Header
