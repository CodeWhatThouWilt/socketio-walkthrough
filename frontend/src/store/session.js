import { csrfFetch } from "./csrf";

export const SET_USER = "session/setUser";
export const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
    return {
        type: SET_USER,
        user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        return data;
    }
    return response;
};

export const login = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/session`, {
        method: "POST",
        body: JSON.stringify(user),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data));
        return data;
    }
    return res;
};

export const signup = (user) => async (dispatch) => {
    const { email, password, username } = user;
    const response = await csrfFetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
        return data;
    }
    return response;
};

export const logout = () => async (dispatch) => {
    const res = await csrfFetch("/api/session", {
        method: "DELETE",
    });
    if (res.ok) {
        console.log(res);
        const data = await res.json();
        dispatch(removeUser());
        return data;
    }
    return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case SET_USER:
            newState.user = action.user;
            return newState;

        case REMOVE_USER:
            newState.user = null;
            return newState;

        default:
            return newState;
    }
};

export default sessionReducer;
