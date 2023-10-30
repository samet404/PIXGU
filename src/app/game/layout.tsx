// react
import { ReactNode } from 'react'

export default function GameLayout(props: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <body>{props.children}</body>
        </html>
    )
}
 