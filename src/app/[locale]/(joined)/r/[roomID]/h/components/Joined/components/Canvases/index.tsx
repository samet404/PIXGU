import { CanvasWrapper } from './components/CanvasWrapper'
import { DraftCanvas } from './components/DraftCanvas'
import { MainCanvas } from './components/MainCanvas'

export const Canvases = () => {
    return (
        <CanvasWrapper>
            <MainCanvas />
            <DraftCanvas name="pencil" code="p" />
            <DraftCanvas name="bucket" code="b" />
        </CanvasWrapper>

    )
}