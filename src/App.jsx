import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import { AuthProvider } from "../context/authProvider";
import NotFound from "./pages/NotFound";
import TokenRefresher from "./components/TokenRefresher";
import ResponseInterceptor from "../middleware/ResponseInterceptor";
import { IsMobileProvider } from "../context/isMobileProvider";
const App = () => {
    return (
        <IsMobileProvider>
            <AuthProvider>
                <TokenRefresher />
                <ResponseInterceptor />

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin/*" element={<AdminDashboard />}></Route>
                    <Route path="/doctor/*" element={<DoctorDashboard />} />
                    <Route path="/patient/*" element={<PatientDashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </IsMobileProvider>
    );
};

export default App;
