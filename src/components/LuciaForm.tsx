// https://lucia-auth.com/guidebook/github-oauth/nextjs-app/#form-component

'use client'

import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'

type LuciaFormProps = {
  children: React.ReactNode
  action: string
} & ComponentProps<'form'>

const LuciaForm = ({ children, action, ...rest }: LuciaFormProps) => {
  const router = useRouter()

  return (
    <form
      action={action}
      method="post"
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          redirect: 'manual',
        })

        if (response.status === 0) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.refresh()
        }
      }}
      {...rest}
    >
      {children}
    </form>
  )
}

export default LuciaForm
