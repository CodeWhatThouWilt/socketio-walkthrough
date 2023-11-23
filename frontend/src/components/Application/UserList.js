import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import { useEffect } from "react";

const UserList = () => {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className="user-list-ctn">
            <ul>
                {Object.values(users).map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
