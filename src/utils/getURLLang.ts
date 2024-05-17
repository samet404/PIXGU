import 'server-only'

// import { headers } from 'next/headers'
// import type { Locale } from '@/types'

// /**
//  * Get the first part of the pathname that represents language from the server component.
//  * Shouldn't be used in the client because app uses server side to set the language.
//  */
// export const getURLLang = () => {
//   const headerList = headers()
//   console.dir(headerList)
//   const pathname = headerList.get('x-current-path')!
//   console.log(`pathname: ${pathname}`)
//   const parts = pathname.split('/')
//   const lastPart = parts[0] as Locale

//   return lastPart
// }
