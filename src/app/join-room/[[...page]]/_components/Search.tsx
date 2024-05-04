import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const Search = () => {
  return (
    <div className="flex w-full rounded-md bg-[rgba(255,255,255,0.3)] text-[rgba(255,255,255,0.6)] shadow-md  backdrop-blur-sm  ">
      <input
        placeholder="Enter room id or name here"
        className={`${urbanist.className} h-full grow p-2 placeholder:text-[rgba(255,255,255,0.3)]`}
        type="text"
      />
      <button className="flex items-center justify-center rounded-r-lg bg-[rgba(255,255,255,0.25)] px-2 py-1 shadow-[0_0px_20px_1px_rgba(0,0,0,0.2)]">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="size-6 text-[#ffffffbd] drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]"
        />
      </button>
    </div>
  )
}

export default Search
