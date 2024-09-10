import { NavLink, Outlet } from "react-router-dom";
import styles from "./../styles/AppLayout.module.css";

function AppLayout() {
    return (
        <main className={styles.main}>
            <NavLink className={styles.btn} to="/home">
                ←
            </NavLink>
            <div className={styles.background}>
                <div className={styles.container}>
                    <nav className={styles.sidebar}>
                        <ul className={styles.sortList}>
                            <li>
                                <NavLink
                                    to="/scheduling/agendar"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : ""
                                    }
                                >
                                    Agendar Serviço
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/scheduling/agendamentos"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : ""
                                    }
                                >
                                    Meus Agendamentos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/scheduling/delete-account"
                                    className={({ isActive }) =>
                                        isActive ? styles.activeLink : ""
                                    }
                                >
                                    Excluir Conta
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.content}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AppLayout;
