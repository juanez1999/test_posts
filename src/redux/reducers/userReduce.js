const initialState = {
    user: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                user: action.payload
            }
        default:
            return state;
    }
}