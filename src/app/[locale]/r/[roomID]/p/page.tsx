import type { Locale } from '@/types'
import PassBox from './_components/PassBox'

const Password = ({ params }: Props) => {
  return <PassBox />
}

export default Password

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
