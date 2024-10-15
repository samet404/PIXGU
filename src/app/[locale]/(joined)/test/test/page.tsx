import { Buttons } from './components/Buttons'
import { ChangeBtn } from './components/ChangeBtn'

const Test = () => {
  return (
    <div className="flex flex-col gap-2">
      <ChangeBtn />
      <div className="h-screen overflow-y-scroll">
        <div className="flex  flex-col gap-1 ">
          <Buttons />
        </div>
      </div>
    </div>
  )
}

export default Test
