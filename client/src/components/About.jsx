import { useState } from "react";
import styles from "./../styles/About.module.css";
import useVisibilityChange from "../useVisibilityChange";

function About() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useVisibilityChange((inView) => {
        setIsVisible(inView);
    });

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${
                isVisible ? "visibleSection" : "hiddenSection"
            }`}
        >
            <h2>Sobre nós</h2>
            <div className={styles.container}>
                <div className={styles.image_container}>
                    <img
                        src="/images/hair-exe.jpg"
                        alt="corte de cabelo"
                    />
                </div>
                <div className={styles.description_container}>
                    <img
                        src="/images/logo-black.png"
                        alt="logo"
                    />
                    <h3>Corte de cabelo de qualidade</h3>
                    <p>
                        A Barbearia Elegance oferece um ambiente elegante e
                        confortável, onde cada detalhe foi cuidadosamente
                        pensado para garantir uma experiência relaxante. Com
                        poltronas de couro, decoração vintage e uma atmosfera
                        acolhedora, nossa barbearia é o lugar perfeito para você
                        se sentir renovado. Valorizamos a satisfação de nossos
                        clientes e nos esforçamos para superar suas
                        expectativas. Venha nos visitar e descubra por que o
                        Salão do Pedro é a escolha preferida dos homens que
                        valorizam estilo, tradição e qualidade.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default About;
