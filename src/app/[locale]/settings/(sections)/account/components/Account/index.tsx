import type { User } from 'lucia'
import SectionWrapper from '../../../_components/SectionWrapper'
import { LogoutBtn } from './components/LogoutBtn'
import { Pfp } from './components/Pfp'
import { Username } from './components/Username'
import type { Locale } from '@/types/locale'
import { getLangObj } from './lang'

export const AccountSection = async ({ user, locale }: Props) => {
    const { heading, changePfpText, username, logout } = await getLangObj(locale)

    return (
        <SectionWrapper text={heading}>
            <div className="flex flex-col gap-2">
                <Pfp ID={user.id} profilePicture={user.profilePicture} changePfpText={changePfpText} />
                <Username username={user.username} {...username} />
                <div className="flex pt-20">
                    <LogoutBtn text={logout} />
                </div>
            </div>
        </SectionWrapper>
    )
}

type Props = {
    locale: Locale
    user: User
}