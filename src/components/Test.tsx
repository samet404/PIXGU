'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'

const Test = () => {
    const pathname = usePathname()
    return <div className={clsx('bg-blue-950 text-white', {
        'bg-violet-600': pathname === '/login'
    })}>{pathname}</div>
}

export default Test
