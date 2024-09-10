import { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";

function ProtectedRoute({ element: Component, ...rest }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (!user) {
            document.body.style.backgroundImage =
                "url('/images/salao-back.jpg')";
        } else {
            document.body.style.backgroundImage = "";
        }
        return () => {
            document.body.style.backgroundImage = "";
        };
    }, [user]);

    return user ? (
        <Component {...rest} />
    ) : (
        <AuthForm
            setHiddenPopUp={() => {}}
            isLogin={true}
            onLogin={(userData) => setUser(userData)}
        />
    );
}

export default ProtectedRoute;
