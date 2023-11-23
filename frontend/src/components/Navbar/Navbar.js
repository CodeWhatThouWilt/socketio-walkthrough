import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu/NavMenu";
import { Modal } from "../../Context/Modal/Modal";
import LoginModal from "../Modals/LoginModal";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState();
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <div className="nav-ctn">
                <div className="nav-logo-ctn">
                    <div>
                        <img
                            src="https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"
                            alt="airbnb logo"
                        />
                        <div>airbnb</div>
                    </div>
                </div>
                <div className="nav-right-ctn">
                    <div className="nav-host-ctn">
                        <Link>Become a Host</Link>
                        <div>
                            <i className="fa-solid fa-globe" />
                        </div>
                    </div>
                    <div
                        onClick={() => setShowMenu(true)}
                        className="nav-user-ctn"
                    >
                        <i className="fa-solid fa-bars" />
                        <div className="nav-user-icon-ctn">
                            <div className="nav-user-icon-border"></div>
                            <i className="fa-solid fa-user" />
                        </div>
                        {showMenu && (
                            <NavMenu setShowLoginModal={setShowLoginModal} />
                        )}
                    </div>
                </div>
            </div>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginModal setShowLoginModal={setShowLoginModal} />
                </Modal>
            )}
        </>
    );
};

export default Navbar;
