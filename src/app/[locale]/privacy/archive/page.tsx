import { archiveTimestamps } from '../_archive'
import Link from 'next/link'
import Template from '../_components/Template'
import type { Locale } from '@/types/locale'
import { getLangObj } from './lang'


const Archive = async ({ params }: Props) => {
    const { locale } = await params
    const { heading } = await getLangObj(locale)

    return (

        <Template>
            <h1>{heading}</h1>
            {archiveTimestamps.map((i) => <Link className='text-blue-100' key={i} href={`/privacy/archive/${i}`}>{new Date(parseInt(i)).toString()}</Link>)}
        </Template>
    )
}

export default Archive

type Props = {
    params: Promise<{
        locale: Locale
    }>
}