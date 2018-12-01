const initState = {
    user: {},
    searchedUser: [],
    selectedUser: {},
    profileUser: {},
    profileImage: ''
}

const SAVE_SESSION_USER = "SAVE_SESSION_USER";
const SAVE_SEARCHED_USER = "SAVE_SEARCHED_USER";
const SELECTED_USER = "SELECTED_USER";
const PROFILE_USER = "PROFILE_USER";
const PROFILE_IMAGE = "PROFILE_IMAGE";
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
        case PROFILE_IMAGE: 
            return {
                ...state,
                profileImage: action.payload.profileImage
            }
        default: return state
    }
}

export default reducer;