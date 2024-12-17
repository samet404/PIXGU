import SectionWrapper from '../_components/SectionWrapper'
import { Alert } from './_components/Alert'
import { Items } from './_components/Items'
import { RecordBinding } from './_components/RecordBinding'

const Controls = async () => {
  return (
    <SectionWrapper text="Controls">
      <div className="flex flex-col gap-2 items-start">
        <div className='pb-2 text-sm text-[#0000009b]'>
          You can customize your key bindings below.
        </div>

        <Items />
        <Alert />
      </div>
      <RecordBinding />
    </SectionWrapper>
  )
}

export default Controls
