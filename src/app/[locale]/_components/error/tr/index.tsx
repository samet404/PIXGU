import { Outfit } from 'next/font/google'
import Link from 'next/link'
import { useEffect } from 'react'

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['700', '600', '500', '900'],
})

export const TrError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className={`${outfit.className} selection:!bg-white selection:text-red-600 text-white bg-gradient-to-b from-red-600 to-red-800 min-h-screen w-full flex flex-col items-center justify-center p-4`}>
            <div className=' flex flex-col gap-6 text-center w-full items-center'>
                <div className='max-w-md flex flex-col items-center gap-6 text-center'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-3xl font-[900]'>Ups! Bir Şeyler Yanlış Gitti</h1>
                        <p className='text-red-100 font-[500]'>Üzgünüz, beklenmedik bir hata oluştu.</p>
                    </div>

                    <div className='flex flex-col gap-4 bg-red-700/30 p-6 rounded-lg'>
                        <h2 className='font-[700] text-lg'>Bu çözümleri deneyebilirsiniz:</h2>
                        <ul className='text-left space-y-2 text-red-100'>
                            <li className='flex items-center gap-2'>
                                <span>•</span>
                                <span>Sayfayı yenileyin</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <span>•</span>
                                <span>Tarayıcı önbelleğini temizleyin</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <span>•</span>
                                <span>İnternet bağlantınızı kontrol edin</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <span>•</span>
                                <span>Yerel depolamayı temizleyin</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='flex gap-4 justify-center'>
                    <button
                        onClick={() => reset()}
                        className='px-6 py-2 bg-white text-red-600 rounded-lg font-[600] hover:bg-red-100 transition-colors'
                    >
                        Tekrar Dene
                    </button>
                    <button
                        onClick={() => {
                            localStorage.clear()
                            reset()
                        }}
                        className='px-6 py-2 bg-white text-red-600 rounded-lg font-[600] hover:bg-red-100 transition-colors'
                    >
                        Tüm yerel verileri temizle
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className='px-6 py-2 bg-red-700 text-white rounded-lg font-[600] hover:bg-red-800 transition-colors'
                    >
                        Ana Sayfa
                    </button>
                    <Link
                        className='px-6 py-2 bg-red-700 text-white rounded-lg font-[600] hover:bg-red-800 transition-colors'
                        href='https://discord.gg/YdqGAvHtFK' target='_blank'>
                        Discord Destek
                    </Link>
                </div>

                {error.digest && (
                    <p className='text-sm text-red-200'>
                        Hata ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    )
}