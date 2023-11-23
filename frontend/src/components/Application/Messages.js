import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMessages } from "../../store/messages";

const Messages = () => {
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.messages);

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    return (
        <div className="messages-ctn">
            <ul>
                {Object.values(messages).map((message) => (
                    <li key={message.id}>
                        <div>{message.User.username}</div>
                        <div>{message.content}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;
