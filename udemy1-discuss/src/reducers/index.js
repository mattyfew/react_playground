// A reducer is a function that returns a piece of the application state

import { combineReducers } from 'redux';
import ThreadsReducer from './reducer_threads';
import ActiveThread from './reducer_active_thread';

const rootReducer = combineReducers({
    threads: ThreadsReducer,
    activeThread: ActiveThread
})

export default rootReducer;
