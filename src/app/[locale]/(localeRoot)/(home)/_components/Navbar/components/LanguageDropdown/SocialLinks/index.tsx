import { faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import SocialLink from './components/SocialLink'

const SocialLinks = () => {
  return (
    <div className=" flex flex-row flex-wrap gap-2">
      <SocialLink href="https://discord.gg/KB48qQCqCx" faIcon={faDiscord} />
      <SocialLink href="https://x.com/PIXAWAI_Game" faIcon={faXTwitter} />
    </div>
  )
}
export default SocialLinks
