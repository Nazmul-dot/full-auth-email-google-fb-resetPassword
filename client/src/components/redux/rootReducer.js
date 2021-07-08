import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import postReducer from './post/postReducer'
const rootReducer=combineReducers({
    userData:userReducer,
    postData:postReducer
})

export default rootReducer