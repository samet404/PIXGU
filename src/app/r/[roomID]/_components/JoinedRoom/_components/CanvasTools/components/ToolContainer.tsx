type ToolContainerProps = {
  title: string
  children: JSX.Element
}

const ToolContainer = ({ title, children }: ToolContainerProps) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md bg-[rgba(255,255,255,0.4)] p-2">
      <div className="w-full rounded-md bg-[rgba(255,255,255,0.5)] px-1 text-sm text-[#0000007b]">
        {title}
      </div>
      {children}
    </div>
  )
}

export default ToolContainer
