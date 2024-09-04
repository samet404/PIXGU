import Counter from './_components/Counter'
import { Parent } from './_components/Parent'

const A = () => {
  return (
    <div className="text-white">
      <Parent a={21231232}>
        <Counter />
      </Parent>
    </div>
  )
}

export default A
