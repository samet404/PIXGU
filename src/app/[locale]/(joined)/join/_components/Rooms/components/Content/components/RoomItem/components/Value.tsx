export const Value = ({ value, className }: Props) => {
  return (
    <div
      className={`flex flex items-center justify-center rounded-md px-2 py-1 text-[0.9rem] text-[rgba(255,255,255,0.8)] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)] ${className}`}
    >
      {value}
    </div>
  )
}

type Props = {
  value: string
  className?: string
}
