let promise: Promise<void> | null = null

export default typeof queueMicrotask === 'function'
    ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
    // reuse resolved promise, and allocate it lazily
    : (cb: () => void) => (promise || (promise = Promise.resolve()))
        .then(cb)
        .catch(err => setTimeout(() => { throw err }, 0))
