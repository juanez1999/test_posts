export function setUser(userId){
    return (dispatch) => {
        dispatch(setNewUser(userId))
    }
}

const setNewUser = (userId) => ({
    type: 'SET_USER',
    payload: userId
})