import { notFound } from 'next/navigation'
import Template from '../../_components/Template'
import type { MDXContentProps } from '../Introduction.mdx'
import Link from 'next/link'


const SpesificArchive = async ({ params }: {
    params: {
        time: string
    }
}) => {

    const { time } = params

    const Content = await (async () => {
        try {
            return (await import(`../../_archive/${time}.mdx`)).default as MDXComponent

        } catch (error) {
            console.error(error)
            notFound()
        }
    })()

    return <Template>
        <h1>ARCHIVED PIXGU PRIVACY POLICY</h1>
        {new Date(parseInt(time)).toLocaleString()}

        <Content />
        <div className='pb-10'>
            <h2>Contact us</h2>

            <p>Email us at pixguu@gmail.com with any questions about this Privacy Policy or how we process your information. We’ll be happy to help.                    </p>

            <h2>
                Changes to this Privacy Policy

            </h2>
            <p>
                We will update this Privacy Policy from time to time. We always indicate the date the last changes were published, and if changes are significant, we’ll provide a more prominent notice as required by law, such as by highlighting the changes within the services.
                Previous versions of this Privacy Policy are available in <Link className='text-blue-500' href='/privacy/archive'>Archive</Link>. Current privacy policy is <Link className='text-blue-500' href='/privacy'>here</Link>.
            </p>

        </div>
    </Template>
}

export default SpesificArchive

type MDXComponent = (props: { readonly [K in keyof MDXContentProps]: MDXContentProps[K] }) => JSX.Element
