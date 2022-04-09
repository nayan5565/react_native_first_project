import { combineReducers } from 'redux'
import apiReducer from './apiReduce'
import counterReducer from './counterReducer'
import friendsReducer from './friendsReducer'
const allReducers = combineReducers({
    counter: counterReducer,
    friends: friendsReducer,
    apis: apiReducer
})
export default allReducers