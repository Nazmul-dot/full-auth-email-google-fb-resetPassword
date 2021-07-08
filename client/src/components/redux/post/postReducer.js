import {
    ALL_POST, POST_CREATE, POST_DELETE, POST_ERROR, POST_LIKE, POST_UPDATE, POST_SELECT, POST_FILTER, POST_SORT
} from './postType'
const postinitialstate = {
    allpost: [],
    filterpost: [],
    loading: true,
    error: '',
    seletcPost: {},
    search: '',
}

const postReducer = (state = postinitialstate, action) => {
    switch (action.type) {
        case ALL_POST:
            return {
                ...state,
                allpost: action.payload,
                filterpost: action.payload,
                loading: false,
                error: ''
            }
        case POST_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case POST_CREATE:
            return {
                ...state,
                allpost: [...state.allpost, action.payload]
            }
        case POST_SELECT:
            return {
                ...state,
                seletcPost: action.payload
            }
        case POST_DELETE:
            return {
                ...state,
                allpost: state.allpost.filter((item) => item._id !== action.payload)
            }
        case POST_LIKE:
            return {
                ...state,
                allpost: state.allpost.map((post) => post._id === action.payload._id ? action.payload : post)
            }
        case POST_FILTER:
            const { name, value } = action.payload
            return {
                ...state,
                [name]: value

            }
        case POST_SORT:
            var tempost
            tempost = state.filterpost.filter((item) => {
                const regex = new RegExp(`${state.search}`, 'gi')
                return item.creator.match(regex) || item.title.match(regex)
            })
            return {
                ...state,
                allpost: tempost
            }
        default: return state
    }
}
export default postReducer