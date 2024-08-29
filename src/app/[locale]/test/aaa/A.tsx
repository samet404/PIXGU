import { asyncTimeout } from '@/utils/asyncTimeout'

const A = async () => {
  await asyncTimeout(1000)
  console.log('A')
  return <div>A</div>
}

export default A
