import { useState, useEffect } from "react";
import api from "./../api.jsx";
import styles from "./../styles/RemoveSchedulePage.module.css";

function RemoveSchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/schedules/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSchedules(response.data.data.schedules);
            } catch (err) {
                console.error("Error fetching schedules:", err);
                setError("Erro ao carregar os agendamentos.");
            }
        };

        fetchSchedules();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/schedules/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSchedules(schedules.filter((schedule) => schedule._id !== id));
        } catch (err) {
            console.error("Error deleting schedule:", err);
            setError("Erro ao excluir o agendamento.");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Meus Agendamentos</h2>

            <ul className={styles.sortList}>
                {schedules.length > 0 ? (
                    schedules.map((schedule) => (
                        <li key={schedule._id}>
                            <span className={styles.service}>
                                {schedule.service.name} -{" "}
                            </span>
                            <span className={styles.date}>
                                {new Date(
                                    schedule.scheduledDate
                                ).toLocaleString()}
                            </span>

                            <button
                                title="cancelar"
                                className={styles.btn}
                                onClick={() => handleDelete(schedule._id)}
                            >
                                ⛔
                            </button>
                        </li>
                    ))
                ) : (
                    <p className={styles.noData}>
                        Não há agendamentos futuros.
                    </p>
                )}
            </ul>
        </div>
    );
}

export default RemoveSchedulePage;
