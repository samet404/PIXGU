import { faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import SocialLink from './components/SocialLink'
import { Fragment } from 'react'

const SocialLinks = () => {
  return (
    <Fragment>
      <SocialLink href="https://discord.gg/KB48qQCqCx" faIcon={faDiscord} />
      <SocialLink href="https://x.com/PIXAWAI_Game" faIcon={faXTwitter} />
    </Fragment>
  )
}
export default SocialLinks
