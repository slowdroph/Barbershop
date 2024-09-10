import { useEffect, useState } from "react";
import styles from "./../styles/Header.module.css";
import Navbar from "./Navbar";

function Header() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1100) {
                setIsNavbarVisible(false);
            } else {
                setIsNavbarVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={styles.header}>
            {isNavbarVisible && <Navbar />}
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>Barbearia Elegance</h1>
            </div>
        </header>
    );
}

export default Header;
