import "./AuthModal.css";
import { login } from "../../store/session";
import { useState } from "react";
import { useDispatch } from "react-redux";

const LoginModal = () => {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const dispatch = useDispatch();

    const handlePassword = (e) => setPassword(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ credential, password }));
    };

    // const demoHandler = () => {
    //     dispatch(login({ credential: "Demo", password: "password" }));
    // };

    const showPasswordHandler = () => {
        return (
            <div
                className="toggle-password"
                onClick={() => setHidePassword((prev) => !prev)}
            >
                {hidePassword ? (
                    <i className="fa-regular fa-eye" />
                ) : (
                    <i className="fa-regular fa-eye-slash" />
                )}
            </div>
        );
    };

    return (
        <div className="auth-modal-ctn">
            <div className="auth-modal-header">Log in</div>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Username"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
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
                <button>Log in</button>
            </form>
            {/* <button className="demo-btn" onClick={demoHandler}>
                Try out a demo!
            </button> */}
        </div>
    );
};

export default LoginModal;
