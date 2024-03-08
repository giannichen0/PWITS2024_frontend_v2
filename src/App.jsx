import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import { AuthProvider } from "../context/authProvider";
import NotFound from "./pages/NotFound";
import TokenRefresher from "./components/TokenRefresher";

const App = () => {
    return (
        <AuthProvider>
            <TokenRefresher></TokenRefresher>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin/*" element={<AdminDashboard />}></Route>
                <Route path="/doctor/*" element={<DoctorDashboard />} />
                <Route path="/patient/*" element={<PatientDashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
