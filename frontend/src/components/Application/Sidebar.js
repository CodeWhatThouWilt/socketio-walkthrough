import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../store/session";

const Sidebar = () => {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await dispatch(logout());
    };

    return (
        <div className="sidebar-ctn">
            <ul>
                <li onClick={logoutHandler}>Logout</li>
            </ul>
        </div>
    );
};

export default Sidebar;
