// https://stackoverflow.com/a/39495173/22740544

export type Enumerate<
    N extends number,
    Acc extends number[] = [],
> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<
    Enumerate<T>,
    Enumerate<F>
>