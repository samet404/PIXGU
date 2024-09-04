export const Item = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-[700] ">{title}</h2>
      <div className="flex flex-col gap-5">
        {description.map((txt, i) => (
          <p key={i} className="">
            {txt}
          </p>
        ))}
      </div>
    </div>
  )
}

type Props = {
  title: string
  description: string[]
}
