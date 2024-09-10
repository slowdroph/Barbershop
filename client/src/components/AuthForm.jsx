import { useState } from "react";
import axios from "axios";
import styles from "./../styles/AuthForm.module.css";

function AuthForm({ setHiddenPopUp, isLogin, onLogin }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin
                ? "https://barbershop-server-ebon.vercel.app/api/v1/users/login"
                : "https:https://barbershop-server-ebon.vercel.app/api/v1/users/signup";
            const data = isLogin
                ? {
                      email: formData.email,
                      password: formData.password,
                  }
                : formData;

            const response = await axios.post(url, data);

            if (response.data.status === "success") {
                setHiddenPopUp(false);
            }

            const userData = response.data.data.user;
            const token = response.data.token;

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            onLogin(userData);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.errors) {
                const fieldErrors = {};
                err.response.data.errors.forEach((error) => {
                    fieldErrors[error.field] = error.message;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ general: "Algo deu errado. Tente novamente." });
            }
        }
    };

    return (
        <>
            <div className={`${styles.popup} ${!isLogin ? styles.login : ""}`}>
                <h2 className={styles.title}>
                    {isLogin ? "Login" : "Registrar"}
                </h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <label htmlFor="name">Nome:</label>
                            <input
                                className={errors.name ? styles.inputError : ""}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Digite seu nome"
                                value={formData.name}
                                onChange={handleChange}
                                required={!isLogin}
                            />
                            {errors.name && (
                                <p className="error">{errors.name}</p>
                            )}
                        </>
                    )}

                    <label htmlFor="email">Email:</label>
                    <input
                        className={errors.email ? styles.inputError : ""}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label htmlFor="password">Senha:</label>
                    <input
                        className={errors.password ? styles.inputError : ""}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && (
                        <p className="error">{errors.password}</p>
                    )}

                    {!isLogin && (
                        <>
                            <label htmlFor="passwordConfirm">
                                Confirme a Senha:
                            </label>
                            <input
                                className={
                                    errors.passwordConfirm
                                        ? styles.inputError
                                        : ""
                                }
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                placeholder="Confirme sua senha"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                required={!isLogin}
                            />
                            {errors.passwordConfirm && (
                                <p className="error">
                                    {errors.passwordConfirm}
                                </p>
                            )}
                        </>
                    )}

                    <button type="submit" className={styles.submitButton}>
                        {isLogin ? "Login" : "Registrar"}
                    </button>

                    {errors.general && (
                        <p className="error">{errors.general}</p>
                    )}
                </form>
            </div>

            <div
                className={styles.overlay}
                onClick={() => setHiddenPopUp(false)}
            ></div>
        </>
    );
}

export default AuthForm;
