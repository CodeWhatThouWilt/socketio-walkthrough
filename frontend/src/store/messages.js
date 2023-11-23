import { csrfFetch } from "./csrf";

const LOAD_MESSAGES = "messages/loadMessages";
const ADD_MESSAGE = "messages/addMessage";

export const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages,
});

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message,
});

export const getMessages = () => async (dispatch) => {
    const res = await csrfFetch("/api/messages");

    if (res.ok) {
        const messages = await res.json();
        dispatch(loadMessages(messages));
        return messages;
    }
    return res;
};

export const postMessage = (message) => async (dispatch) => {
    const res = await csrfFetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(message),
    });

    if (res.ok) {
        const message = await res.json();
        dispatch(addMessage(message));
        return message;
    }
    return res;
};

const initialState = {};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return action.messages.reduce((obj, message) => {
                obj[message.id] = message;
                return obj;
            }, {});
        case ADD_MESSAGE:
            return { ...state, [action.message.id]: action.message };
        default:
            return state;
    }
};

export default messagesReducer;
