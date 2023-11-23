import { useState } from "react";
import { useDispatch } from "react-redux";
import { postMessage } from "../../store/messages";

const MessageInput = ({ handleMessage }) => {
    const [content, setContent] = useState("");
    const dispatch = useDispatch();

    const handleContent = (e) => setContent(e.target.value);

    return (
        <div className="message-input-ctn">
            <form onSubmit={(e) => handleMessage(e, content, setContent)}>
                <input type="text" value={content} onChange={handleContent} />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default MessageInput;
