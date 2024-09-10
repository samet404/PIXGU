import Settings from './components/Settings'
import { UserProfile } from './components/UserProfile'

const RightSide = () => {
  return (
    <div className="flex h-full flex-col items-center gap-1">
      <UserProfile />
      <Settings />
    </div>
  )
}
export default RightSide
