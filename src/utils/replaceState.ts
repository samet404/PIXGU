/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
 */
export const replaceState = (
  url: string,
  doAfter: () => void,
  state?: object,
) => {
  window.history.replaceState(state ?? null, '', url)

  doAfter()
}
