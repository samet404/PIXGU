import { Map } from './components/Map'
import { NextBackBtn } from './components/NextBackBtn'
import { Text } from './components/Text'
import { TipImage } from './components/TipImage'

export const Content = () => {
    return (
        <div className='z-30 w-full absolute h-full backdrop-blur-sm flex top-0 left-0 '>

            <div className='w-full h-full relative flex items-center justify-center'>
                <TipImage />

                <Text />

                <div className='flex absolute right-2 bottom-6 drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]'>
                    <NextBackBtn type='back' />
                    <NextBackBtn type='next' />
                </div>
            </div>
            <div className='absolute bottom-0 left-0 w-full flex flex-col shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] backdrop-blur-lg'>
                <Map />
            </div>
        </div>
    )
}