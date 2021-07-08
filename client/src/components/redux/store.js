import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducr from './rootReducer'
const store=createStore(
    rootReducr,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store