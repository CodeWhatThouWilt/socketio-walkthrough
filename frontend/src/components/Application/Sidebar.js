import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../store/session";

const Sidebar = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    const logoutHandler = async () => {
        await dispatch(logout());
    };

    return (
        <div className="sidebar-ctn">
            <h2>{user.username}</h2>
            <ul>
                <li onClick={logoutHandler}>Logout</li>
            </ul>
        </div>
    );
};

export default Sidebar;
