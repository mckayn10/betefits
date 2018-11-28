export const sessionUser = (user) => {
    return {
        type: 'SAVE_SESSION_USER',
        payload: {
            user: user
        }
    }
}

export const searchedUser = (user) => {
    return {
        type: 'SAVE_SEARCHED_USER',
        payload: {
            searchedUser: user
        }
    }
}

export const selectedUser = (user) => {
    return {
        type: 'SELECTED_USER',
        payload: {
            selectedUser: user
        }
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const profileUser = (user) => {
    return {
        type: 'PROFILE_USER',
        payload: {
            profileUser: user
        }
    }
}

