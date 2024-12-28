import { archiveTimestamps } from './_archive'
import Template from './_components/Template'
import type { MDXProps } from 'mdx/types'
import type { Metadata } from 'next'
import type { Locale } from '@/types/locale'
import { EndContent } from './EndContent'
import { getLangObj } from './lang'
import { notFound } from 'next/navigation'

const lastArchive = archiveTimestamps[archiveTimestamps.length - 1]!


export const metadata: Metadata = {
    title: 'PRIVACY',
    keywords: [
        'pixgu privacy policy',
        'pixgu privacy',
        'PIXGU privacy policy',
        'PIXGU privacy',
    ],
    description: 'This Privacy Policy explains how we collect, use, store, protect, and share your personal information through our services.'
}

const Privacy = async ({ params }: Props) => {
    const { locale } = await params
    const { heading, published } = await getLangObj(locale)

    try {
        const Content: MDXComponent = (await import(`./_archive/${locale}/${lastArchive}.mdx`)).default

        return <Template>
            <h1>{heading}</h1>

            {published}: {new Date(parseInt(lastArchive)).toLocaleString()}

            <Content />
            <EndContent locale={locale} />
        </Template>
    } catch (error) {
        console.error(error)
        notFound()
    }
}

export default Privacy

type MDXComponent = (props: { readonly [K in keyof MDXProps]: MDXProps[K] }) => JSX.Element

type Props = {
    params: Promise<{
        locale: Locale
    }>
}
