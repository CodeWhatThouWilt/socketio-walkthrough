import "./AuthModal.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SignUpModal = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfPassword = (e) => setConfPassword(e.target.value);

    const showPasswordHandler = () => {
        return (
            <div
                className="toggle-password"
                onClick={() => setHidePassword((prev) => !prev)}
            >
                {hidePassword ? (
                    <i className="fa-regular fa-eye" />
                ) : (
                    <i class="fa-regular fa-eye-slash" />
                )}
            </div>
        );
    };

    return (
        <div className="auth-modal-ctn">
            <div className="auth-modal-header">Sign Up</div>
            <form>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    placeholder="Username"
                />
                <div className="password-ctn">
                    <input
                        type={hidePassword ? "password" : "text"}
                        value={password}
                        onChange={handlePassword}
                        placeholder="Password"
                    />
                    {showPasswordHandler()}
                </div>
                <input
                    type={hidePassword ? "password" : "text"}
                    value={confPassword}
                    onChange={handleConfPassword}
                    placeholder="Confirm Password"
                />
                <button>Submit!</button>
            </form>
        </div>
    );
};

export default SignUpModal;
