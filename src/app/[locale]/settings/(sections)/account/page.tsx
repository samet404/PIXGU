import Pfp from './components/Pfp'
import Logout from './components/Logout'
import Username from './components/Username'
import { api } from '@/trpc/server'
import SectionWrapper from '../_components/SectionWrapper'

const Account = async () => {
  const user = await api.auth.getUser.query()

  if (user)
    return (
      <SectionWrapper text="Account">
        <div className="flex flex-col gap-2">
          <Pfp profilePicture={user.profilePicture} />
          <Username username={user.username} />
          <Logout />
        </div>
      </SectionWrapper>
    )
}

export default Account
