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

export const updatePicture = (image) => {
    return {
        type: 'PROFILE_IMAGE',
        payload: {
            profileImage: image
        }
    }
}

export const requestNotif = (number) => {
    return {
        type: 'NUM_REQUESTS',
        payload: {
            numRequests: number
        }
    }
}

export const updateBet = (bet) => {
    return {
        type: 'CURRENT_BET',
        payload: {
            currentBet: bet
        }
    }
}
