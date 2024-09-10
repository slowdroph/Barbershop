import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SchedulingPage from "./pages/SchedulingPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import RemoveSchedulePage from "./pages/RemoveSchedulePage";
import AppLayout from "./pages/AppLayout";
import DeleteAccountPage from "./pages/DeleteAccountPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route index path="/home" element={<HomePage />} />

                <Route
                    path="/scheduling"
                    element={<ProtectedRoute element={AppLayout} />}
                >
                    <Route
                        index
                        element={<Navigate to="/scheduling/agendar" replace />}
                    />
                    <Route path="agendar" element={<SchedulingPage />} />
                    <Route
                        path="agendamentos"
                        element={<RemoveSchedulePage />}
                    />
                    <Route
                        path="delete-account"
                        element={<DeleteAccountPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
