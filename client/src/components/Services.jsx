import { useEffect, useState } from "react";
import styles from "./../styles/Services.module.css";
import api from "./../api.jsx";
import useVisibilityChange from "../useVisibilityChange.jsx";

function Services() {
    const [servicesData, setServicesData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useVisibilityChange((inView) => {
        setIsVisible(inView);
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get("/services");
                setServicesData(response.data.data.services);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        };

        fetchServices();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${
                isVisible ? "visibleSection" : "hiddenSection"
            }`}
        >
            <h2>Serviços</h2>
            <ul className={styles.RenderList}>
                {servicesData.map((service) => (
                    <Prices data={service} key={service._id} />
                ))}
            </ul>
        </section>
    );
}

function Prices({ data }) {
    return (
        <li className={styles.PriceList}>
            <h3 className={styles.PriceTitle}>{data.name}</h3>
            <p className={styles.description}>{data.description}</p>
            <span className={styles.price}>&#x52;&#x24; {data.price}</span>
        </li>
    );
}

export default Services;
