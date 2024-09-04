import { Client1 } from './_components/Client1'
import { Counter } from './_components/Counter'
import { Provider } from './_components/Provider'

const Page = () => {
  return (
    <Provider>
      <Client1 />
      <Counter />
    </Provider>
  )
}

export default Page
