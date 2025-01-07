import Spinner from '@/components/Spinner'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { api } from '@/trpc/react'
import { useEffect, useRef, type MutableRefObject } from 'react'
import { inputInfoTextAtom, isPublicAtom } from '../atoms'
import { useSetAtom } from 'jotai'
import { useCreateRoomInputs } from '@/zustand/store'

export const GeneratePassBtn = ({ inputRef, displayText }: Props) => {
    const setInputInfoText = useSetAtom(inputInfoTextAtom)
    const setIsPublic = useSetAtom(isPublicAtom)
    const copyDivRef = useRef<HTMLDivElement | null>(null)
    const setValue = useCreateRoomInputs((s) => s.setPass)
    const { data, isLoading, refetch } = api.auth.getCuid2.useQuery(undefined, {
        enabled: false,
    })

    useEffectOnce(() => {
        copyDivRef.current = document.createElement('div')
    })


    useEffect(() => {
        if (!data) return

        (async () => {
            copyDivRef.current!.textContent = data
            await navigator.clipboard.writeText(copyDivRef.current!.textContent)

            setIsPublic(false)
            setInputInfoText('Looks good ✨')
            inputRef.current!.value = data
            setValue(data)
        })()
    }, [data])



    return (
        <button
            onMouseDown={() => refetch()}
            className="rounded-md flex flex-row gap-3 items-center bg-[#0000001f] hover:bg-[#00000038]  px-2 py-1 text-sm text-[rgba(255,255,255,0.6)]"
        >
            <div>{displayText}</div>
            {isLoading === true && data ? <Spinner className='size-4' /> : null}
        </button>
    )
}

type Props = {
    inputRef: MutableRefObject<HTMLInputElement | null>
    displayText: string
}