import { getLastPartOfPathnameServer } from '@/utils/getLastPartOfPathnameServer'
import { headers } from 'next/headers'

const page = (params: any) => {
  const headerList = headers()
  console.log('headerList page')
  console.dir(headerList)
  const pathname = headerList.get('x-current-path')!

  console.log(pathname)
  return <div className="text-white">{pathname}</div>
}
export default page
