import { useState } from "react";
import { useDispatch } from "react-redux";
import { postMessage } from "../../store/messages";

const MessageInput = () => {
    const [content, setContent] = useState("");
    const dispatch = useDispatch();

    const handleContent = (e) => setContent(e.target.value);

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
            await dispatch(postMessage({ content }));
            setContent("");
        } catch (res) {
            const errors = await res.json();
            console.log(errors);
        }
    };

    return (
        <div className="message-input-ctn">
            <form onSubmit={handleMessage}>
                <input type="text" value={content} onChange={handleContent} />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default MessageInput;
