import api from "./../api.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./../styles/DeleteAccountPage.module.css";

function DeleteAccountPage() {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            await api.delete("/users/deleteMe", {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            alert("Conta excluída com sucesso!");
            navigate("/home");
        } catch (err) {
            console.error("Error deleting account:", err);
            alert("Erro ao excluir a conta. Por favor, tente novamente.");
        }
    };

    return (
        <div className={styles.deletePage}>
            <h2>Excluir Conta</h2>
            <p>
                Tem certeza de que deseja excluir sua conta?<br></br> Esta ação
                não pode ser desfeita.
            </p>
            <button onClick={handleDeleteAccount}>Excluir Conta</button>
        </div>
    );
}

export default DeleteAccountPage;
