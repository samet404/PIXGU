import Link from 'next/link'
import { archiveTimestamps } from './_archive'
import type { MDXContentProps } from './archive/Introduction.mdx'
import Template from './_components/Template'
const lastArchive = archiveTimestamps[archiveTimestamps.length - 1]!

const Content: MDXComponent = (await import(`./_archive/${lastArchive}.mdx`)).default


const Privacy = () => {

    return <Template>
        <h1>PIXGU PRIVACY POLICY</h1>
        {new Date(parseInt(lastArchive)).toLocaleString()}

        <Content />
        <div className='pb-10'>
            <h2>Contact us</h2>

            <p>Email us at pixguu@gmail.com with any questions about this Privacy Policy or how we process your information. We’ll be happy to help.                    </p>

            <h2>
                Changes to this Privacy Policy

            </h2>
            <p>
                We will update this Privacy Policy from time to time. We always indicate the date the last changes were published, and if changes are significant, we’ll provide a more prominent notice as required by law, such as by highlighting the changes within the services.
                Previous versions of this Privacy Policy are available in <Link className='text-blue-500' href='/privacy/archive'>Archive</Link>.
            </p>

        </div>
    </Template>
}

export default Privacy

type MDXComponent = (props: { readonly [K in keyof MDXContentProps]: MDXContentProps[K] }) => JSX.Element