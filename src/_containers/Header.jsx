import React from "react";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../constants/routes";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    LOGO
                </Link>
                <div className="header__menu menu">
                    {/* <nav className="menu__body">
                        <ul className="menu__list">
                            <li className="menu__item">
                                <NavLink to={CHAT_ROUTE} className="menu__link">
                                    Chat
                                </NavLink>
                            </li>
                            <li className="menu__item">
                                <NavLink to={LOGIN_ROUTE} className="menu__link">
                                    Login
                                </NavLink>
                            </li>
                        </ul>
                    </nav> */}
                </div>
                {user ? (
                    <button type="button" onClick={() => auth.signOut()} className="header__btn btn">
                        Log Out
                    </button>
                ) : (
                    <Link to={LOGIN_ROUTE} className="header__btn btn">
                        Log In
                    </Link>
                )}
                <button type="button" className="menu__icon icon-menu">
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
