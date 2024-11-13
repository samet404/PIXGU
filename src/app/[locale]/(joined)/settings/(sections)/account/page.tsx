import { Pfp } from './components/Pfp'
import Username from './components/Username'
import { api } from '@/trpc/server'
import SectionWrapper from '../_components/SectionWrapper'
import { LogoutBtn } from './components/LogoutBtn'
import dynamic from 'next/dynamic'
import { ChangesApplyAllTabs } from '../_components/ChangesApplyAllTabs'

const GuestAccount = dynamic(() =>
  import('./components/GuestAccount').then((m) => m.GuestAccount),
)

const Account = async () => {
  const user = await api.auth.getUser.query()

  if (user)
    return (
      <SectionWrapper text="Account">
        <ChangesApplyAllTabs />

        <div className="flex flex-col gap-2">
          <Pfp ID={user.id} profilePicture={user.profilePicture} />
          <Username username={user.username} />
          <div className="flex pt-20">
            <LogoutBtn />
          </div>
        </div>
      </SectionWrapper>
    )

  return <GuestAccount />
}

export default Account
