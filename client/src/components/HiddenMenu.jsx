import { NavLink } from "react-router-dom";
import styles from "./../styles/HiddenMenu.module.css";
import { FaTimes } from "react-icons/fa";

function HiddenMenu({ user, handleOpenForm, handleLogout, setHiddenMenu }) {
    return (
        <nav className={styles.container}>
            <button
                onClick={() => setHiddenMenu(false)}
                className={styles.closeMarker}
            >
                <i>
                    <FaTimes />
                </i>
            </button>

            {user && <p className={styles.userName}>Olá, {user.name}</p>}

            <ul className={styles.UnorderedList}>
                <li className={styles.list}>
                    <NavLink to="/home">Home</NavLink>
                </li>
                <li className={styles.list}>
                    <NavLink to="/scheduling">Agendar</NavLink>
                </li>
                {user ? (
                    <>
                        <li className={styles.styledBtn}>
                            <button onClick={handleLogout}>sair</button>
                        </li>
                    </>
                ) : (
                    <>
                        <div className={styles.buttons}>
                            <li className={styles.styledBtn}>
                                <button onClick={() => handleOpenForm(false)}>
                                    Registrar
                                </button>
                            </li>
                            <li className={styles.styledBtn}>
                                <button onClick={() => handleOpenForm(true)}>
                                    Entrar
                                </button>
                            </li>
                        </div>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default HiddenMenu;
