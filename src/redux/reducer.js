const initState = {
    username: '',
    id: '',

}

const reducer = (state = initState, action) => {
    switch(action.type){
        case "USER":
            return {
                username: action.payload.username,
                id: action.payload.id
            }
        default: return state
    }
}

export default reducer;