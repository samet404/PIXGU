import { PreventRefresh } from '@/components/PreventRefresh'
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <PreventRefresh>
            {children}
        </PreventRefresh>
    )
}

export default Layout