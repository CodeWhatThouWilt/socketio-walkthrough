import "./Application.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import UserList from "./UserList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../../store/messages";
import { io } from "socket.io-client";
let socket;

const Application = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket = io();

        socket.on("chat", (chat) => {
            console.log("HEY BRO");
            dispatch(addMessage(chat));
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    const handleMessage = async (e, content, setContent) => {
        e.preventDefault();
        if (content.length === 0) return;

        await socket.emit("chat", { content });
        setContent("");
    };

    return (
        <div className="app-ctn">
            <Sidebar />
            <div className="msg-ctn">
                <Messages />
                <MessageInput handleMessage={handleMessage} />
            </div>
            <UserList />
        </div>
    );
};

export default Application;
