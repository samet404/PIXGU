import { logout } from './actions/logout'
import { Btn } from './components/Btn'

const Logout = () => {
  return (
    <form action={logout} className="pt-20">
      <Btn />
    </form>
  )
}

export default Logout
