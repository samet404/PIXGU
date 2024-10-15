import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className="absolute left-0 top-0 z-50 flex w-full flex-row justify-end p-5">
      <div className="flex flex-row justify-end">
        <Link
          href={'/login'}
          className="select-none rounded-md bg-[#0000002a] px-2 py-1 text-white backdrop-blur-sm duration-300 hover:opacity-50"
        >
          Play
        </Link>
      </div>
    </nav>
  )
}
