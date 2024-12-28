import { notFound } from 'next/navigation'
import Template from '../../_components/Template'
import type { MDXProps } from 'mdx/types'
import type { Locale } from '@/types/locale'
import { EndContent } from '../../EndContent'
import { getLangObj } from './lang'


const SpesificArchive = async ({ params }: {
    params: Promise<{
        locale: Locale
        time: string
    }>
}) => {
    const { time, locale } = await params
    const { heading } = await getLangObj(locale)
    const Content = await (async () => {
        try {
            return (await import(`../../_archive/${locale}/${time}.mdx`)).default as MDXComponent
        } catch (error) {
            console.error(error)
            notFound()
        }
    })()

    return <Template>
        <h1>{heading}</h1>
        {new Date(parseInt(time)).toLocaleString()}

        <Content />
        <EndContent locale={locale} />
    </Template>
}

export default SpesificArchive

type MDXComponent = (props: { readonly [K in keyof MDXProps]: MDXProps[K] }) => JSX.Element
