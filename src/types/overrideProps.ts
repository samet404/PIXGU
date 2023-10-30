// Problem: https://www.totaltypescript.com/tutorials/react-with-typescript/components/overriding-and-removing-component-props
// Solution: https://www.totaltypescript.com/tutorials/react-with-typescript/components/overriding-and-removing-component-props/solution

export type OverrideProps<TProps, TOverridden> = Omit<
    TProps,
    keyof TOverridden 
> &
    TOverridden