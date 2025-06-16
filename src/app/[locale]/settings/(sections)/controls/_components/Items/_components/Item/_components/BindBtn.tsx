import { clsxMerge } from '@/utils/clsxMerge'
import { useAtom } from 'jotai'
import { recordingAtom } from '../../../../../atoms'
import { useControls, type ControlsState } from '@/zustand/store/useControls'
import { useOnClickOutside } from 'usehooks-ts'
import { useRef } from 'react'

export const BindBtn = ({ name }: Props) => {
    const [recording, setRecording] = useAtom(recordingAtom)
    const value = useControls(s => s.keys[name as keyof ControlsState['keys']])
    const ref = useRef(null)
    const isRecording = recording?.key === name
    const btnText = (() => {
        if (isRecording) {
            if (recording.value.length === 0) return 'Recording'
            return recording.value.join(' + ')
        }

        return value.join(' + ')
    })()

    useOnClickOutside(ref, () => setRecording(null))

    return (
        <button
            ref={ref}
            onClick={() => setRecording({
                key: name,
                value: []
            })} className={clsxMerge('duration-200 p-2 bg-[#47d69a] shadow-md rounded-md text-[#00000079] ', {
                'bg-[#f66c86] animate-pulse': isRecording,
            })}>
            {btnText}
        </button>
    )
}

type Props = {
    name: string
}