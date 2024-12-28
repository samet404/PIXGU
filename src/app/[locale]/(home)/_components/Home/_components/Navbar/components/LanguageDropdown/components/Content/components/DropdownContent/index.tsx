import LanguageBtn from './components/LanguageBtn'

const DropdownContent = () => {
  return (
    <div
      className={
        'absolute bottom-0 left-0 right-0 hidden animate-fade justify-end animate-duration-300 animate-once group-hover:flex'
      }
    >
      <div className="absolute right-[0] z-20 pb-[2rem] pl-[2rem] pt-[1rem]">
        <div className="grid h-auto w-32 grid-cols-2 gap-2 rounded-md border-b-[0.2rem] border-b-[#888888] bg-[rgb(205,205,205)] p-2  shadow-[0_0px_30px_-1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
          <LanguageBtn locale="tr" />
          <LanguageBtn locale="en" />
        </div>
      </div>
    </div>
  )
}

export default DropdownContent
