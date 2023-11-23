import "./Application.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import UserList from "./UserList";

const Application = () => {
    return (
        <div className="app-ctn">
            <Sidebar />
            <div className="msg-ctn">
                <Messages />
                <MessageInput />
            </div>
            <UserList />
        </div>
    );
};

export default Application;
