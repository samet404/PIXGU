import { BlurFocus } from './components/BlurFocus'
import { CanvasWrapper } from './components/CanvasWrapper'
import { MainCanvas } from './components/MainCanvas'
import { UseCanvasWorker } from './components/UseCanvasWorker'

export const Canvases = () => {
    return (
        <CanvasWrapper>
            <div className="relative">
                <UseCanvasWorker />
                <BlurFocus />
                <MainCanvas />
            </div>
        </CanvasWrapper>

    )
}