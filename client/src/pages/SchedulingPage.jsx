import { useState, useEffect } from "react";
import styles from "./../styles/SchedulingPage.module.css";
import api from "./../api.jsx";
import Message from "./../components/Message.jsx";

function SchedulingPage() {
    const [scheduledDate, setScheduledDate] = useState("");
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get("/services");
                setServices(response.data.data.services);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Erro ao carregar os serviços.");
            }
        };

        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedService || !scheduledDate) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/schedules",
                {
                    scheduledDate,
                    serviceId: selectedService,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage({
                type: "success",
                text: "Agendamento realizado com sucesso!",
            });
            setError("");
            setScheduledDate("");
            setSelectedService("");
        } catch (err) {
            console.error(err);
            const errorMsg =
                err.response?.data?.message ||
                "Ocorreu um erro ao realizar o agendamento. Por favor, tente novamente.";
            setMessage({
                type: "error",
                text: errorMsg,
            });
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(
            now.getMinutes() + ((30 - (now.getMinutes() % 30)) % 30),
            0,
            0
        );
        return now.toISOString().slice(0, 16);
    };

    const getMaxDateTime = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 3);
        maxDate.setHours(17, 0, 0, 0);
        return maxDate.toISOString().slice(0, 16);
    };

    const validateDateTime = (value) => {
        const selectedDate = new Date(value);
        const dayOfWeek = selectedDate.getDay();
        const hours = selectedDate.getHours();
        const minutes = selectedDate.getMinutes();

        if (dayOfWeek === 0) {
            setError("Agendamentos não são permitidos aos domingos.");
            return false;
        }

        if (hours < 8 || hours > 17 || (hours === 17 && minutes > 0)) {
            setError("O horário deve estar entre 08:00 e 17:00.");
            return false;
        }

        if (minutes !== 0 && minutes !== 30) {
            setError("Os horários disponíveis são apenas a cada 30 minutos.");
            return false;
        }

        setError("");
        return true;
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        if (validateDateTime(value)) {
            setScheduledDate(value);
        } else {
            setScheduledDate("");
        }
    };

    return (
        <main className={styles.main}>
            <h2>Agende um serviço</h2>

            {message && <Message type={message.type} text={message.text} />}

            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="service">Escolha um serviço:</label>
                <select
                    id="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                >
                    <option value="">Selecione um serviço</option>
                    {services.map((service) => (
                        <option key={service._id} value={service._id}>
                            {service.name} - R$ {service.price}
                        </option>
                    ))}
                </select>

                <label htmlFor="scheduledDate">Data do Agendamento:</label>
                <input
                    type="datetime-local"
                    id="scheduledDate"
                    value={scheduledDate}
                    onChange={handleDateChange}
                    min={getMinDateTime()}
                    max={getMaxDateTime()}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">Agendar</button>
            </form>
        </main>
    );
}

export default SchedulingPage;
