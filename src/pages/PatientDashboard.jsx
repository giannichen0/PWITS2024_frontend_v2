import React, { useEffect, useContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import AuthContext from "../../context/authProvider";
import NavbarPatient from "../components/NavbarPatient";
import NotFound from "./NotFound";
import PatientProfile from "./patient/PatientProfile";
import PatientDoctor from "./patient/PatientDoctor";
import PatientExam from "./patient/PatientExam";
import PatientReport from "./patient/PatientReport";

const PatientDashboard = () => {
    const navigate = useNavigate();

    const { accessToken } = useContext(AuthContext);
    const role = accessToken.split("\t")[1];
    console.log(role);
    useEffect(() => {
        if (!accessToken || role !== "patient") navigate("/");
    }, []);
    return (
        <>
            <NavbarPatient></NavbarPatient>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PatientProfile
                            accessToken={accessToken.split("\t")[0]}
                            role={role}
                        />
                    }
                />
                <Route
                    path="/doctors"
                    element={
                        <PatientDoctor
                            accessToken={accessToken.split("\t")[0]}
                            role={role}
                        />
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <PatientReport
                            accessToken={accessToken.split("\t")[0]}
                            role={role}
                        />
                    }
                />
                <Route
                    path="/exams"
                    element={
                        <PatientExam
                            accessToken={accessToken.split("\t")[0]}
                            role={role}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default PatientDashboard;
