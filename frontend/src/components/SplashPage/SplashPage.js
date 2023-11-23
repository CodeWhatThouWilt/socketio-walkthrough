import "./SplashPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import LoginModal from "../Modals/LoginModal";
import SignUpModal from "../Modals/SignUpModal";
import { Modal } from "../../Context/Modal/Modal";

const SplashPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const dispatch = useDispatch();

    const openLoginModal = () => setShowLoginModal(true);
    const openSignUpModal = () => setShowSignUpModal(true);

    return (
        <section>
            <h1>Welcome!</h1>
            <h2>April 2023 Cohort Chat App</h2>
            <h3>This is just a little chat app for showcasing socket.io</h3>
            <button onClick={openLoginModal}>Log In</button>
            <button onClick={openSignUpModal}>Sign Up</button>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginModal />
                </Modal>
            )}
            {showSignUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)}>
                    <SignUpModal />
                </Modal>
            )}
        </section>
    );
};

export default SplashPage;
