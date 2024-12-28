import type { Locale } from '@/types/locale'
import Link from 'next/link'
import { getLangObj } from './lang'

export const EndContent = async ({ locale }: Props) => {
    const { contact, support, archive, archiveHeading, archiveDescription } = await getLangObj(locale)

    return (
        <div className='pb-10'>
            <h2>{contact}</h2>
            <p>{support}</p>
            <h2>{archiveHeading}</h2>
            <p>{archiveDescription} <Link className='text-blue-500' href='/privacy/archive'>{archive}</Link>. </p>
        </div>
    )
}

type Props = {
    locale: Locale
}