import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import friendsReducer from './friendsReducer'
const allReducers = combineReducers({
    counter: counterReducer,
    friends: friendsReducer
})
export default allReducers