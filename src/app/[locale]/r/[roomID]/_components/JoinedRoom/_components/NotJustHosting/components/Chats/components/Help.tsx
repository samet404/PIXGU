export const Help = ({ text }: Props) => {
  return (
    <div className="group relative flex size-7 cursor-help items-center justify-center rounded-full bg-[#ffffff7f] text-[#00000069]">
      <span className="absolute right-2 top-11 z-50 hidden w-96  animate-fade-down rounded-md bg-gray-100 px-2 py-1 leading-5 text-[#929292] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] animate-delay-75 group-hover:flex">
        {text}
      </span>
      ?
    </div>
  )
}

type Props = {
  text: string
}
