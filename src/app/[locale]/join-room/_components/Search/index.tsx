import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const Search = () => {
  return (
    <div className="flex w-full gap-2 text-[rgba(255,255,255,0.6)] drop-shadow-md">
      <input
        placeholder="name"
        className={`${urbanist.className} h-full grow rounded-md bg-[rgba(255,255,255,0.3)] p-2 placeholder:text-[rgba(255,255,255,0.3)]`}
        type="text"
      />
      <button className="flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.25)] px-4 py-1 shadow-[0_0px_20px_1px_rgba(0,0,0,0.2)] duration-300 focus:opacity-60">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="size-6 text-[#ffffff95] drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]"
        />
      </button>
    </div>
  )
}

export default Search
