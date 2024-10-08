export const Item = ({ title, description }: Props) => {
  return (
    <div className="flex max-w-[90%] flex-col items-start  gap-4">
      <h2 className="font-[700] ">{title}</h2>
      <div className="flex flex-col gap-5">
        {description.map((txt, i) => (
          <div key={i} className="text-start">
            {txt}
          </div>
        ))}
      </div>
    </div>
  )
}

type Props = {
  title: string
  description: string[]
}
