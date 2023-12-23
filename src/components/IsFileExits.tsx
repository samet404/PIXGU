import { headers } from 'next/headers'
import fs from 'fs'
import { type ReactNode } from 'react'

// eslint-disable-next-line no-undef
const isFileExits = ({ children }: { children: ReactNode }) => {
  const env = process.env
  const baseUrl = env.NEXTAUTH_URL! + '/'

  const headersList = headers()
  let pageName = (headersList.get('x-url') ?? '').replace(baseUrl, '')
  if (pageName == '') pageName = 'home'

  const audioPath = `./public/sound/music/page/${pageName}/background.mp3`
  const isAudioFileExits = fs.existsSync(audioPath)

  return children
}

export default isFileExits
