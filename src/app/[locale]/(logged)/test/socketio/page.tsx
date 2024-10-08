import { Client } from './Client'
import dynamic from 'next/dynamic'

const Provider = dynamic(() => import('./Provider'), { ssr: false })

const page = () => {
  return (
    <Provider>
      <Client />
    </Provider>
  )
}
export default page
