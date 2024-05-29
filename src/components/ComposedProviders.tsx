import type { ReactNode } from 'react'

export const ComposedProviders = ({
  providers,
  children,
}: Props): JSX.Element => {
  const composeProviders =
    (...providers: AnyComponent) =>
    ({ children }: { children: ReactNode }) => {
      return providers.reduceRight(
        (child: ReactNode, Provider) => <Provider>{child}</Provider>,
        children,
      )
    }

  const ComposedProviders = composeProviders(...providers)

  return <ComposedProviders>{children}</ComposedProviders>
}

type Props = {
  // eslint-disable-next-line no-unused-vars
  providers: ((props: any) => JSX.Element)[]
  children: ReactNode
}

// eslint-disable-next-line no-unused-vars
type AnyComponent = ((props: any) => ReactNode)[]
