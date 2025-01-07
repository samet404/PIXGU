import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
    actions?: ReactNode
}

export const StatusMessage = ({ children, actions }: Props) => (
    <div className="flex flex-col items-center gap-2">
        <div className="flex flex-row gap-3">{children}</div>
        {actions && <div className="flex flex-row gap-2">{actions}</div>}
    </div>
)