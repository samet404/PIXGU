import { RefreshBtn } from '@/components/RefreshBtn'
import Link from 'next/link'
import { Fragment } from 'react'

export const ActionButtons = ({ tryAgainText, goToActiveRoomsText }: ActionButtonsProps) => (
    <Fragment>
        <RefreshBtn className="rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]">
            {tryAgainText}
        </RefreshBtn>
        <Link href="/join" className="rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]">
            {goToActiveRoomsText}
        </Link>
    </Fragment>
)

type ActionButtonsProps = {
    tryAgainText: string
    goToActiveRoomsText: string
}

