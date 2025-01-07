import { useDeveloperSettings } from '@/zustand/store'

/**
 * Useful for debugging
 * 
 * @link https://www.freecodecamp.org/news/mutating-objects-what-will-be-logged-in-the-console-ffb24e241e07/
 */
export const stringifiedLog = (obj: object) => {
    if (!useDeveloperSettings.getState().isOpen) return
    console.log(JSON.stringify(obj, null, 2))
}