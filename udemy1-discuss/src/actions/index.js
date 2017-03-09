export function selectThread(thread) {
    // selectThread is an ActionCreator, it needs to return an action, an object with a type property
    return {
        type: 'THREAD_SELECTED',
        payload: thread
    }
}
