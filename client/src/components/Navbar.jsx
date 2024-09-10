import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./../styles/Navbar.module.css";
import AuthForm from "./AuthForm";
import useVisibilityChange from "../useVisibilityChange";
import { FaBars } from "react-icons/fa";
import HiddenMenu from "./HiddenMenu";

function Navbar() {
    const [hiddenPopUp, setHiddenPopUp] = useState(false);
    const [hiddenMenu, setHiddenMenu] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);

    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useVisibilityChange((inView) => {
        setIsVisible(inView);
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleOpenForm = (login) => {
        setIsLogin(login);
        setHiddenPopUp(true);
        setHiddenMenu(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <>
            <span ref={triggerRef}></span>
            <nav
                className={`${styles.nav} ${!isVisible ? styles.navTest : ""}`}
            >
                <ul className={styles.nav_list}>
                    <li className={styles.Link}>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li className={styles.Link}>
                        <NavLink to="/scheduling">Agendar</NavLink>
                    </li>
                    <li className={styles.logo}>
                        <NavLink to="/home">
                            <img
                                src="/images/logo-white.png"
                                alt="logo"
                            />
                        </NavLink>
                    </li>
                    {user ? (
                        <>
                            <li className={styles.user}>
                                <p>Olá, {user.name}</p>
                            </li>

                            <li className={styles.MainBtn}>
                                <button onClick={handleLogout}>sair</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={styles.MainBtn}>
                                <button onClick={() => handleOpenForm(false)}>
                                    Registrar
                                </button>
                            </li>
                            <li className={styles.MainBtn}>
                                <button onClick={() => handleOpenForm(true)}>
                                    Entrar
                                </button>
                            </li>
                        </>
                    )}
                    <li className={styles.hiddenBtn}>
                        <button onClick={() => setHiddenMenu(true)}>
                            <i>
                                <FaBars />
                            </i>
                        </button>
                    </li>
                </ul>

                {hiddenMenu && (
                    <HiddenMenu
                        user={user}
                        handleLogout={handleLogout}
                        handleOpenForm={handleOpenForm}
                        setHiddenMenu={setHiddenMenu}
                    />
                )}

                {hiddenPopUp && (
                    <AuthForm
                        setHiddenPopUp={setHiddenPopUp}
                        isLogin={isLogin}
                        onLogin={(userData) => setUser(userData)}
                    />
                )}
            </nav>
        </>
    );
}

export default Navbar;
