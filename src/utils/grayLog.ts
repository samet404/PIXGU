/**
 * Logs a message with a gray color scheme
 */
export const grayLog = (text: string[] | string, ...rest: any) => {
  console.log(
    `%c${typeof text === 'string' ? text : text.join(' ')}`,
    'color: #b7b7b7; font-weight: 800; background-color: #424242; border-radius: 0.2rem; padding-left: 0.4rem; padding-right: 0.4rem;  padding-top: 0.15rem;  padding-bottom: 0.15rem;',
    ...rest,
  )
}
