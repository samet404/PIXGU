import { CloseBtn } from './components/CloseBtn'

export const Content = () => {
  return (
    <div className="absolute left-0 top-0 z-[80] h-full w-full animate-fade bg-[#ffff0069] backdrop-blur-md">
      <CloseBtn />
      <div className="flex h-full w-full flex-col gap-1">
        <div className=""></div>
      </div>
    </div>
  )
}
