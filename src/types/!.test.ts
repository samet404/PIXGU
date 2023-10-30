// type SelectOption = {
//     name: string
//     value: string | null
//     icon?: string
//     description?: string
//     disabled?: boolean
// }

// function useComboboxFilter<T extends SelectOption>(props: {
//     options: T[]
//     filterValue: string
// }): { filteredOptions: T[] } {
//     let filteredOptions = props.filterValue
//         ? props.options.filter((option) =>
//               option.name.includes(props.filterValue),
//           )
//         : props.options

//     if (props.filterValue && !filteredOptions.length) {
//         filteredOptions = [
//             { name: 'No results found', value: null, disabled: true },
//         ]
//     }

//     return { filteredOptions }
// }

// ///////////////////////////

// function useComboboxFilter2<T extends SelectOption>(props: {
//     options: T[]
//     createOption: (
//         option: Pick<SelectOption, 'name' | 'value' | 'disabled'>,
//     ) => T
//     filterValue: string
// }): { filteredOptions: T[] } {
//     let filteredOptions = props.filterValue
//         ? props.options.filter((option) =>
//               option.name.includes(props.filterValue),
//           )
//         : props.options

//     if (props.filterValue && !filteredOptions.length) {
//         filteredOptions = [
//             props.createOption({
//                 name: 'No results found',
//                 value: null,
//                 disabled: true,
//             }),
//         ]
//     }

//     return { filteredOptions }
// }

// const createOption = (option: SelectOption): { id: string } & SelectOption => ({
//     id: Math.random().toString(),
//     ...option,
// })

// type SelectOptionWithId = {} & SelectOption

// const myFilter = useComboboxFilter2<SelectOptionWithId>({
//     options: [],
//     createOption,
//     filterValue: 'bla',
// })

//


// type NakedUsage<T> = T extends boolean ? "YES" : "NO"
// type WrappedUsage<T> = [T] extends [boolean] ? "YES" : "NO"; // wrapped in a tuple

// type Distributed = NakedUsage<number | boolean > // = NakedUsage<number> | NakedUsage<boolean> =  "NO" | "YES" 
// type NotDistributed = WrappedUsage<number | boolean > // "NO"    
// type NotDistributed2 = WrappedUsage<boolean > // "YES"

// const a = Boolean('d')