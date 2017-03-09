// state argument is not application state, onlt the state this reducer is responsible for
export default function(state = null, action) {
    switch (action.type) {
    case 'THREAD_SELECTED':
        return action.payload
    default:
        return state
    }
}
