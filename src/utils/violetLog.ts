/**
 * Logs a message with a violet color scheme
 */
export const violetLog = (text: string[] | string, ...rest: any) => {
  console.log(
    `%c${typeof text === 'string' ? text : text.join(' ')}`,
    'color: #000000a4; font-weight: 800; background-color: #6f00ff; border-radius: 0.2rem; padding-left: 0.4rem; padding-right: 0.4rem;  padding-top: 0.15rem;  padding-bottom: 0.15rem;',
    ...rest,
  )
}
