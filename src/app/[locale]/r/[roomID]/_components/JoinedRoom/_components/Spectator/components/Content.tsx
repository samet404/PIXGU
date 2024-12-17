export const Content = () => {
  return (
    <div
      style={{
        backgroundImage:
          'radial-gradient(at 9% 3%, #0f4563 0px, transparent 50%), radial-gradient(at 100% 3%, #0f4563 0px, transparent 50%)',
      }}
      className="absolute left-0 top-0 z-50 flex h-full w-full animate-fade items-start justify-start p-2"
    >
      <div className="rounded-xl p-1 font-[500] text-white ">
        You are spectator
      </div>
    </div>
  )
}
