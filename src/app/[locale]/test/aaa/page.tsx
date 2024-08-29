import { Suspense } from 'react'
import A from './A'
import B from './B'

const Page = () => {
  return (
    <div>
      <Suspense fallback={'asdas'}>
        <A />
      </Suspense>
      <B />
    </div>
  )
}

export default Page
