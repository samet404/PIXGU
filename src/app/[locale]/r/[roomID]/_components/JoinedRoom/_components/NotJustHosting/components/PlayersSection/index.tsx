import Me from './components/Me'
import { Others } from './components/Others'

const PlayersSection = () => {
  return (
    <section
      id="playersSection"
      className="h-full overflow-y-scroll xl:w-[12rem]"
    >
      <div className="flex w-full flex-col shadow-xl ">
        <Me />
        <Others />
      </div>
    </section>
  )
}

export default PlayersSection
