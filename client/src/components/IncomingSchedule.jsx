import { useState, useEffect } from "react";
import styles from "./../styles/IncomingSchedule.module.css";
import useVisibilityChange from "../useVisibilityChange";
import api from "./../api.jsx";

function IncomingSchedule() {
    const [schedules, setSchedules] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useVisibilityChange((inView) => {
        setIsVisible(inView);
    });

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await api.get("/schedules");
                setSchedules(response.data.data.schedules);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSchedules();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${
                isVisible ? "visibleSection" : "hiddenSection"
            }`}
        >
            <h2>futuros agendamentos</h2>
            <div className={styles.scheduleBox}>
                <div className={styles.upcomingInfo}>
                    <span className={styles.dataInfo}>cliente</span>
                    <span className={styles.dataInfo}>data</span>
                    <span className={styles.dataInfo}>serviço</span>
                </div>
                <ul className={styles.scheduleList}>
                    {schedules.length > 0 ? (
                        schedules.map((schedule) => (
                            <li key={schedule._id} className={styles.userList}>
                                <h3 className={styles.userName}>
                                    {schedule.user.name}
                                </h3>
                                <span className={styles.date}>
                                    {new Date(schedule.scheduledDate)
                                        .toLocaleString()
                                        .split(",")
                                        .join(" - ")}
                                </span>
                                <span className={styles.service}>
                                    {schedule.service.name}
                                </span>
                            </li>
                        ))
                    ) : (
                        <p className={styles.noData}>
                            Não há agendamentos futuros.
                        </p>
                    )}
                </ul>
            </div>
        </section>
    );
}

export default IncomingSchedule;
