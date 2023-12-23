import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const clsxMerge = (...classNameInputs: ClassValue[]) => {
  return twMerge(clsx(classNameInputs))
}