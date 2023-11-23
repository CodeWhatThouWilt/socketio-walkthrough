import "./NavMenu.css";
import LoginModal from "../../Modals/LoginModal";
import { useState } from "react";
import { Modal } from "../../../Context/Modal/Modal";

const NavMenu = ({ setShowLoginModal }) => {
    return (
        <>
            <div className="nav-menu-ctn">
                <div>
                    <div className="nav-menu-item">Sign up</div>
                    <div
                        onClick={() => setShowLoginModal(true)}
                        className="nav-menu-item"
                    >
                        Log in
                    </div>
                </div>
                <div>
                    <div className="nav-menu-item">Host your home</div>
                </div>
            </div>
        </>
    );
};

export default NavMenu;
