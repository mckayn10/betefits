const initState = {
    user: {},
    searchedUser: [],
    selectedUser: {},
    profileUser: {}
}

const SAVE_SESSION_USER = "SAVE_SESSION_USER";
const SAVE_SEARCHED_USER = "SAVE_SEARCHED_USER";
const SELECTED_USER = "SELECTED_USER";
const PROFILE_USER = "PROFILE_USER";
const LOGOUT = "LOGOUT"

const reducer = (state = initState, action) => {

    switch(action.type){
        case SAVE_SESSION_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case SAVE_SEARCHED_USER:
            return {
                ...state,
                searchedUser: action.payload.searchedUser
            }
        case SELECTED_USER:
            return {
                ...state,
                selectedUser: action.payload.selectedUser
            }
        case LOGOUT:
            return {
                state
            }
        case PROFILE_USER:
            return {
                ...state,
                profileUser: action.payload.profileUser
            }
        default: return state
    }
}

export default reducer;