import { Fragment } from 'react'
import Link from 'next/link'
import { Svg } from '@/components/Svg'

const socialLinks = [
    {
        href: 'https://discord.gg/YdqGAvHtFK',
        icon: 'discord.svg',
        alt: 'discord_logo'
    },
    {
        href: 'https://twitter.com/pixgu93433',
        icon: 'X.svg',
        alt: 'X_logo'
    },
    {
        href: 'https://bsky.app/profile/pixgu.bsky.social',
        icon: 'bluesky.svg',
        alt: 'bluesky_logo'
    }
]

const SocialLinks = () => {
    return (
        <Fragment>
            {socialLinks.map(({ href, icon, alt }) => (
                <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Svg
                        src={icon}
                        alt={alt}
                        className='w-7 hover:opacity-90 opacity-50'
                    />
                </Link>
            ))}
        </Fragment>
    )
}

export default SocialLinks