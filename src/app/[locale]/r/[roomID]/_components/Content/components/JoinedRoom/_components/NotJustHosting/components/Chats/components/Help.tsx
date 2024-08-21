export const Help = ({ text }: Props) => {
  return (
    <div className="group relative flex size-8 cursor-help items-center justify-center rounded-full bg-[#ffffff7f] text-[1rem] text-[#00000069] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
      ?
    </div>
  )
}

type Props = {
  text: string
}
