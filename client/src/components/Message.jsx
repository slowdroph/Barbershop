import styles from "./../styles/Message.module.css";

function Message({ type, text }) {
    if (!text) return null;

    return <div className={`${styles.message} ${styles[type]}`}>{text}</div>;
}

export default Message;
