/**
 * Logs a message with a gold color scheme
 */
export const goldLog = (text: string) =>
  console.log(
    `%c${text}`,
    'color: #876907; font-weight: 800; background-color: #f4be0d; border-radius: 0.2rem; padding-left: 0.4rem; padding-right: 0.4rem;  padding-top: 0.15rem;  padding-bottom: 0.15rem;',
  )
