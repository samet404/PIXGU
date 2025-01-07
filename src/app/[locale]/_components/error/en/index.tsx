import { Outfit } from 'next/font/google'
import Link from 'next/link'
import { useEffect } from 'react'

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['700', '600', '500', '900'],
})

export const EnError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className={`${outfit.className} selection:!bg-white selection:text-red-600 text-white bg-gradient-to-b from-red-600 to-red-800 min-h-screen w-full flex flex-col items-center justify-center p-4`}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-800 animate-position bg-[length:200%_200%]"></div>
            <div className="relative z-10 flex flex-col gap-6 text-center w-full items-center">

                <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl font-[900]'>Oops! Something Went Wrong</h1>
                    <p className='text-red-100 font-[500]'>We're sorry, but there was an unexpected error.</p>
                </div>

                <div className='flex flex-col gap-4 bg-red-700/30 p-6 rounded-lg'>
                    <h2 className='font-[700] text-lg'>Try these solutions:</h2>
                    <ul className='text-left space-y-2 text-red-100'>
                        <li className='flex items-center gap-2'>
                            <span>•</span>
                            <span>Refresh the page</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span>•</span>
                            <span>Clear your browser cache</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span>•</span>
                            <span>Check your internet connection</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span>•</span>
                            <span>Clear local storage</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='flex gap-4 justify-center'>
                <button
                    onClick={() => reset()}
                    className='px-6 py-2 bg-white text-red-600 rounded-lg font-[600] hover:bg-red-100 transition-colors'
                >
                    Try Again
                </button>
                <button
                    onClick={() => {
                        localStorage.clear()
                        reset()
                    }}
                    className='px-6 py-2 bg-white text-red-600 rounded-lg font-[600] hover:bg-red-100 transition-colors'
                >
                    Clear all local data
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className='px-6 py-2 bg-red-700 text-white rounded-lg font-[600] hover:bg-red-800 transition-colors'
                >
                    Go Home
                </button>
                <Link
                    className='px-6 py-2 bg-red-700 text-white rounded-lg font-[600] hover:bg-red-800 transition-colors'
                    href='https://discord.gg/YdqGAvHtFK' target='_blank'>
                    Discord Support
                </Link>

            </div>

            {error.digest && (
                <p className='text-sm text-red-200'>
                    Error ID: {error.digest}
                </p>
            )}
        </div>
    )
}

