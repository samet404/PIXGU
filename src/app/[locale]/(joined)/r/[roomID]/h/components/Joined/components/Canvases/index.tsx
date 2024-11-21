import { CanvasWrapper } from './components/CanvasWrapper'
import { DraftCanvas } from './components/DraftCanvas'
import { MainCanvas } from './components/MainCanvas'
import { UseCanvasWorker } from './components/UseCanvasWorker'

export const Canvases = () => {
    return (
        <CanvasWrapper>
            <div className="relative">
                <UseCanvasWorker />
                <DraftCanvas name="pencil" code="p" />
                <DraftCanvas name="bucket" code="b" />
                <DraftCanvas name="gradient" code="g" />
                <MainCanvas />
            </div>
        </CanvasWrapper>

    )
}