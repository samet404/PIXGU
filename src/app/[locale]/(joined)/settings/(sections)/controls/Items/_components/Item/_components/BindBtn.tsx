import { clsxMerge } from '@/utils/clsxMerge'
import { useAtom } from 'jotai'
import { recordingAtom } from '../../../../atoms'
import { useControls, type ControlsState } from '@/zustand/store'
import { useOnClickOutside } from 'usehooks-ts'
import { useEffect, useRef } from 'react'

export const BindBtn = ({ name }: Props) => {
    const value = useControls(s => s.keys[name as keyof ControlsState['keys']])
    const [recording, setRecording] = useAtom(recordingAtom)
    const isRecording = recording?.key === name
    const ref = useRef(null)

    useEffect(() => {
        console.log('value changed to', value)
    }, [value])

    useEffect(() => {
        console.log('recording changed to', recording)
    }, [recording])

    useOnClickOutside(ref, () => setRecording(null))

    console.log('recording: ', recording)
    const txt = (() => {

        if (isRecording) {
            if (recording.value.length === 0) return 'Recording'
            else {
                console.log('else', 'recording.value.join(' + ')', recording)
                return recording.value.join(' + ')
            }
        }
        else return value.join(' + ')
    })()

    return (
        <button
            ref={ref}
            onClick={() => setRecording({
                key: name,
                value: []
            })} className={clsxMerge('duration-200 p-2 bg-[#47d69a] shadow-md rounded-md text-[#00000079] ', {
                'bg-[#f66c86] animate-pulse': isRecording,
            })}>
            {txt}
        </button>
    )
}

type Props = {
    name: string
}