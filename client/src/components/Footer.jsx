import styles from "./../styles/Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.description}>
                &copy; Copyright {new Date().getUTCFullYear()}
            </p>
        </footer>
    );
}

export default Footer;
