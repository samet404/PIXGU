import type { Locale } from '@/types'
import { getLangObj } from './lang'
import { Client } from './Client'

export const Powerups = async ({ locale }: Props) => {
    const langObj = await getLangObj(locale)

    return <Client langObj={langObj} />
}

type Props = {
    locale: Locale
}