import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const SchedulingPage = lazy(() => import("./pages/SchedulingPage"));
const RemoveSchedulePage = lazy(() => import("./pages/RemoveSchedulePage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const DeleteAccountPage = lazy(() => import("./pages/DeleteAccountPage"));

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
