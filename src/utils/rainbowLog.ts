/**
 * Logs a message with a rainbow color scheme
 */
export const rainbowLog = (text: string[] | string, ...rest: any) => {
  console.log(
    `%c${typeof text === 'string' ? text : text.join(' ')}`,
    'border-radius: 0.2rem; padding-left: 0.4rem; font-weight: 800; color: #000000c0; padding-right: 0.4rem; padding-top: 0.15rem; padding-bottom: 0.15rem; background-color: pink;  background: repeating-linear-gradient(90deg in hsl longer hue,red,blue 300px); ;',
    ...rest,
  )
}
