export const initialState = {
    users: []
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.payload.users]
            }
        case 'DELETE_USER':
            const newUsers = state.users.filter(person => person.id !== action.payload.id);
            localStorage.setItem('users', JSON.stringify(newUsers));
            return {
                ...state,
                users: newUsers
            }
        default:
            return state
    }
}