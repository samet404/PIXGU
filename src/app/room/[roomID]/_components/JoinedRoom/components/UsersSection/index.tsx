import RenderUsers from './components/RenderUsers'

const UsersSection = () => {
  return (
    <section id="usersSection" className="h-full overflow-y-scroll pr-2">
      <div className="flex w-[12rem] flex-col shadow-xl">
        <RenderUsers />
      </div>
    </section>
  )
}

export default UsersSection
