import styles from "./../styles/Map.module.css";
import emailjs from "@emailjs/browser";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useVisibilityChange from "../useVisibilityChange";
import L from "leaflet";
import Message from "./Message";

const customMarkerIcon = new L.Icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
});

function Map() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const sectionRef = useVisibilityChange((inView) => {
        setIsVisible(inView);
    });
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm("service_2695l0l", "template_03xmnwn", form.current, {
                publicKey: "QjZnUoVK4rTRzXke8",
            })
            .then(
                () => {
                    setMessage({
                        type: "success",
                        text: "Mensagem enviada com sucesso!",
                    });
                },
                () => {
                    setMessage({
                        type: "error",
                        text: "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.",
                    });
                }
            );
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 6000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${
                isVisible ? "visibleSection" : "hiddenSection"
            }`}
        >
            {message && <Message type={message.type} text={message.text} />}
            <div className={styles.container}>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <h2>Entre em contato</h2>
                <form className={styles.form} ref={form} onSubmit={sendEmail}>
                    <input
                        type="email"
                        name="user_email"
                        placeholder="Email"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Escreva aqui sua mensagem"
                        required
                        rows="10"
                    />
                    <button className={styles.submitButton} type="submit">
                        Enviar
                    </button>
                </form>
            </div>

            <MapContainer
                className={styles.leafletContainer}
                center={[-23.74716, -46.472727]}
                zoom={15}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={[-23.74716, -46.472727]}
                    icon={customMarkerIcon}
                >
                    <Popup>
                        <h3>Barbearia Elegance</h3>
                    </Popup>
                </Marker>
            </MapContainer>
        </section>
    );
}

export default Map;
