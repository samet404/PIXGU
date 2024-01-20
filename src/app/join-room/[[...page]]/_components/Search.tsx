import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['500'],
})

const Search = () => {
  return (
    <div className="flex w-full rounded-md bg-[rgba(255,255,255,0.8)] text-[rgba(0,0,0,0.5)] shadow-md backdrop-blur-sm ">
      <input
        placeholder="Enter room id or name here"
        className={`${ubuntu.className} h-full grow p-2 placeholder:text-[rgba(0,0,0,0.2)]`}
        type="text"
      />
    </div>
  )
}

export default Search
