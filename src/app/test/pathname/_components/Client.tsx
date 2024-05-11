'use client'

import { getLastPartOfPathname } from '@/utils/getLastPartOfPathname'
import { usePathname, useRouter } from 'next/navigation'

const Client = () => {
  const pathname = usePathname()
  console.log(pathname)
  return <div>Client</div>
}
export default Client
