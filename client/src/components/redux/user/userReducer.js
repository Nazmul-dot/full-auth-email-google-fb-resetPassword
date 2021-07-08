
import {
    REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS,
    REQUEST_FAIL, USER_LOGGED
} from './userType'
const userInitialState = {
    userDetail: '',
    isAuthenticate: false,
    error: '',
    loading: 'true'
}

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case USER_LOGGED:
            return {
                ...state,
                userDetail: action.payload,
                isAuthenticate: true,
                loading: false
            }
        case LOGOUT_SUCCESS:
        case REQUEST_FAIL:
            return {
                ...state,
                isAuthenticate: false,
                userDetail: '',
                error: action.payload
            }

        default: return state
    }
}
export default userReducer;