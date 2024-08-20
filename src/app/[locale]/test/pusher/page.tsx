import { Client } from './Client'
import { Parent } from './Parent'
import { Provider } from './Provider'

const Pusher = () => {
  return (
    <Parent>
      <Provider>
        <Client />
      </Provider>
    </Parent>
  )
}

export default Pusher
