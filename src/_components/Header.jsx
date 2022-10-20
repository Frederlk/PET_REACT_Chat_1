import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { LOGIN_ROUTE } from "../constants/routes";

const Header = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    LOGO
                </Link>
                {user ? (
                    <button type="button" onClick={() => auth.signOut()} className="header__btn btn">
                        Log Out
                    </button>
                ) : (
                    <Link to={LOGIN_ROUTE} className="header__btn btn">
                        Log In
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
