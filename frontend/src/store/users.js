import { csrfFetch } from "./csrf";

const LOAD_USERS = "messages/loadUsers";

export const loadUsers = (users) => ({
    type: LOAD_USERS,
    users,
});

export const getUsers = () => async (dispatch) => {
    const res = await csrfFetch("/api/users");

    if (res.ok) {
        const users = await res.json();
        dispatch(loadUsers(users));
        return users;
    }
    return res;
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS:
            return action.users.reduce((obj, user) => {
                obj[user.id] = user;
                return obj;
            }, {});
        default:
            return state;
    }
};

export default usersReducer;
