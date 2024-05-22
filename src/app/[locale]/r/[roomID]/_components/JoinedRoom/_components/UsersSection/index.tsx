import Me from './components/Me'
import dynamic from 'next/dynamic'

const RenderUsers = dynamic(() => import('./components/RenderUsers'), {
  ssr: false,
})

const UsersSection = () => {
  return (
    <section id="usersSection" className="h-full overflow-y-scroll pr-2">
      <div className="flex w-[12rem] flex-col shadow-xl">
        <Me />
        <RenderUsers />
      </div>
    </section>
  )
}

export default UsersSection
