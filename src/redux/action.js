const user = (username, id) => {
    return {
        type: 'USER',
        payload: {
            username: username,
            id: id
        }
    }
}

export default user;