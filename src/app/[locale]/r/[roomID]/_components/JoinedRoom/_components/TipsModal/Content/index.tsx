import { GotItBtn } from './components/GotItBtn'
import { Map } from './components/Map'
import { ModalBackground } from './components/ModalBackground'
import { NextBackBtn } from './components/NextBackBtn'
import { Text } from './components/Text'
import { TipImage } from './components/TipImage'

export const Content = () => {
    return (
        <div className='z-30 w-full h-full  absolute top-0 left-0 '>
            <div className='w-full h-full bg-[#00000092]  pt-10 flex justify-center'>
                <ModalBackground>
                    <div className='overflow-y-auto flex flex-col gap-5 items-center justify-center px-2 py-5'>
                        <div className='flex flex-col gap-3 items-center'>
                            <TipImage />
                            <Text />
                        </div>
                        <GotItBtn />
                    </div>

                    <div className='flex flex-col'>
                        <Map />
                        <div className='flex flex-row'>
                            <NextBackBtn type='back' />
                            <NextBackBtn type='next' />
                        </div>
                    </div>
                </ModalBackground>
            </div>
        </div>
    )
}