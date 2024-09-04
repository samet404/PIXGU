export const Content = () => {
  return (
    <div
      style={{
        backgroundImage:
          'radial-gradient(at 9% 3%, hsla(343,0%,0%,0.9) 0px, transparent 50%)',
      }}
      className="absolute left-0 top-0 z-50 flex h-full w-full animate-fade items-start justify-start p-2"
    >
      <div className="rounded-xl p-1 font-[500] text-white backdrop-blur-sm">
        You are spectator now. If you want to join game, host must stop and
        start new game.
      </div>
    </div>
  )
}
