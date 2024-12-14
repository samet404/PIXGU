import { faBluesky, faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import SocialLink from './components/SocialLink'
import { Fragment } from 'react'

const SocialLinks = () => {
  return (
    <Fragment>
      <SocialLink href="https://discord.gg/KB48qQCqCx" faIcon={faDiscord} className='size-8' />
      <SocialLink href="https://bsky.app/profile/pixgu.bsky.social" faIcon={faBluesky} />
      <SocialLink href="https://x.com/pixgu93433" faIcon={faXTwitter} />
    </Fragment>
  )
}
export default SocialLinks
