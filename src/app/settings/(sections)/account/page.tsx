import Pfp from './components/Pfp'
import Logout from './components/Logout'
import Username from './components/Username'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import SectionWrapper from '../_components/SectionWrapper'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const Account = async () => {
  const isLogged = await api.auth.isLogged.query()

  if (!isLogged)
    return (
      <ErrDisplay
        msg="UNAUTHORIZED"
        code={401}
        reason="You need to be logged in to access account settings"
        redirectTo="/login"
      />
    )

  const user = await api.auth.getUser.query()

  if (user)
    return (
      <SectionWrapper text="Account Settings">
        <div className="flex flex-col gap-2">
          <Pfp profilePicture={user.profilePicture} />
          <Username username={user.username} />
          <Logout />
        </div>
      </SectionWrapper>
    )
}

export default Account
