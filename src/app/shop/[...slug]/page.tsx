import Link from 'next/link'
// types
// fonts
import { Inter } from 'next/font/google'
const inter  = Inter({ subsets: ['latin'] })

const page = () => {
    return (
        <div className={`${inter.className} flex flex-row gap-1 w-full h-full`}>
            <div> catchAllSegments</div>
            <Link
                className="text-blue-500"
                href={
                    'https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments'
                }
            >
                more details
            </Link>
        </div>
    )
}

export default page
