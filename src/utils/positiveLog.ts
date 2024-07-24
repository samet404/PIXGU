/**
 * Logs a message with a positive color scheme
 */
export const positiveLog = (text: string, text2?: string) => {
  console.log(
    `%c${text + (text2 ?? '')}`,
    'color: #136356; font-weight: 800; background-color: #26bfa5; border-radius: 0.2rem; padding-left: 0.4rem; padding-right: 0.4rem;  padding-top: 0.15rem;  padding-bottom: 0.15rem;',
  )
}
