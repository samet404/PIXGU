// import { MODIFIER_KEYS } from '@/constants'
// import { useControls } from '@/zustand/store'

// window.addEventListener('DOMContentLoaded', () => {
//     const addToCombination = useControls.getState().addToCombination
//     const setSameCombination = useControls.getState().setSameCombination
//     const clearCombination = useControls.getState().clearCombination
//     const clearCombinationExceptModifiers = useControls.getState().clearCombinationExceptModifiers
//     const clearOneCombinationKey = useControls.getState().clearOneCombinationKey
//     let keydownInterval: typeof setInterval | null = (null)
//     let keydownIntervalKey: string | null = null
//     let keydownIntervalDelay: number = 100
//     let currentModifiers: string[] = []

//     // clears everything
//     const clear = () => {
//         if (keydownInterval) {
//             clearInterval(keydownInterval as unknown as number)
//         }

//         clearCombination()
//         keydownInterval = null
//         keydownIntervalDelay = 100
//         currentModifiers = []
//         keydownIntervalKey = null
//     }

//     // clears everything except modifiers
//     const clearExceptModifiers = () => {
//         clearCombinationExceptModifiers()
//         keydownInterval = null
//         keydownIntervalDelay = 100
//         keydownIntervalKey = null
//     }


//     // sets interval for key for hold down effect
//     const setKeyDownInterval = (key: string) => {
//         clearInterval(keydownInterval as unknown as number)

//         if (keydownIntervalDelay !== 30) {
//             keydownIntervalDelay = Math.max(30, keydownIntervalDelay * 0.75)
//         }
//         keydownIntervalKey = key

//         // @ts-ignore
//         keydownInterval = setInterval(() => {
//             console.log(useControls.getState().combination)
//             setSameCombination()
//         }, keydownIntervalDelay)
//     }


//     const handleKeydown = (e: KeyboardEvent) => {
//         if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
//         e.preventDefault()

//         const currentModifiersVal = currentModifiers
//         const key = e.key.toUpperCase()
//         const combination = useControls.getState().combination

//         // Handle modifier keys
//         if (MODIFIER_KEYS.has(key)) {
//             if (currentModifiersVal.length > 0) {
//                 // Validate modifier state
//                 const hasCorrectModifiers = currentModifiersVal.every(modifier => {
//                     switch (modifier) {
//                         case 'CONTROL':
//                             return e.ctrlKey
//                         case 'ALT':
//                             return e.altKey
//                         case 'SHIFT':
//                             return e.shiftKey
//                         case 'META':
//                             return e.metaKey
//                     }
//                 })
//                 if (!hasCorrectModifiers) {
//                     clear()
//                     return
//                 }
//             }


//             if (!currentModifiersVal.includes(key)) {
//                 currentModifiersVal.push(key)
//                 addToCombination(key)

//                 setKeyDownInterval(key)
//                 return
//             }

//             return
//         }


//         // Handle normal keys without modifiers

//         if (!combination.includes(key)) addToCombination(key)
//         setKeyDownInterval(key)
//     }


//     const handleKeyUp = (e: KeyboardEvent) => {
//         if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

//         const key = e.key.toUpperCase()
//         const isModifier = MODIFIER_KEYS.has(key)
//         if (isModifier) {
//             currentModifiers = currentModifiers.filter(modifier => modifier !== key)
//             clearOneCombinationKey(key)
//         }
//         else clearOneCombinationKey(key)
//         if (useControls.getState().combination.length === 0) clear()

//     }

//     const handleBlur = () => clear()


//     document.addEventListener('keydown', handleKeydown)
//     document.addEventListener('keyup', handleKeyUp)
//     window.addEventListener('blur', handleBlur)
// })