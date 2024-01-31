"use client"

import SearchBtn from './components/SearchBtn'

const SearchBox = () => {
  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-md bg-gradient-to-br from-[#0574d5] to-[#006cb3cd] p-2 shadow-[0_0px_60px_5px_rgba(0,0,0,0.6)] xxs:w-full md:w-[30rem]">
      <input
        className="grow rounded-md bg-[#ffffff58] px-2 py-1 text-white shadow-md placeholder:text-sm placeholder:text-[rgba(255,255,255,0.5)]"
        placeholder="john"
        spellCheck={false}
        id='usernameInput'
        type="text"
      />
      <div className="flex justify-center text-lg text-white">@</div>
      <input
        className="grow rounded-md bg-[#ffffff58] px-2 py-1 text-white shadow-md placeholder:text-sm placeholder:text-[rgba(255,255,255,0.5)]"
        placeholder="0008"
        spellCheck={false}
        id='usernameIDInput'
        type="text"
      />
      <SearchBtn />
    </div>
  )
}

export default SearchBox
