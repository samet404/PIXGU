export const Item = ({ keyValue, value }: Props) => {
  return (
    <div className="flex flex-row  flex-wrap items-center gap-2">
      <div className="line-clamp-1 rounded-md bg-[#00000023] p-1 text-[1rem] font-[700] text-white">
        {keyValue}
      </div>
      <div className="break-all text-[1rem] leading-4 text-[#ffffffb4]">
        {value}
      </div>
    </div>
  )
}

type Props = {
  keyValue: string
  value: string
}
