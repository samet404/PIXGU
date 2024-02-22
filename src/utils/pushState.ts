/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
 */
export const pushState = (url: string, doAfter: () => void, state?: object) => {
  window.history.pushState(state ?? null, '', url)

  doAfter()
}
