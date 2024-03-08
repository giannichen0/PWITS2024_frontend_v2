import React, { useEffect, useContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import AuthContext from "../../context/authProvider";
import NavbarDoctor from "../components/NavbarDoctor"
import NotFound from "./NotFound";
import DoctorExam from "./doctor/DoctorExam"
import DoctorProfile from "./doctor/DoctorProfile";
import DoctorReport from "./doctor/DoctorReport"
import DoctorPatient from "./doctor/DoctorPatient"

const DoctorDashboard = () => {
  const navigate = useNavigate();

    const { accessToken } = useContext(AuthContext);
    const role = accessToken.split("\t")[1]
    useEffect(() => {
        if (!accessToken || role!== "doctor") 
            navigate("/");
        
    }, []);

    return (
        <>
            <NavbarDoctor />
            <Routes>
                <Route
                    path="/"
                    element={
                        <DoctorProfile accessToken={accessToken.split("\t")[0]} role={role} />
                    }
                />
                <Route
                    path="/patients"
                    element={
                        <DoctorPatient
                            accessToken={accessToken.split("\t")[0]}
                            role = {role}
                        />
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <DoctorReport accessToken={accessToken.split("\t")[0]} role={role}/>
                    }
                />
                <Route
                    path="/exams"
                    element={
                        <DoctorExam accessToken={accessToken.split("\t")[0]} role={role}/>
                    }
                />
                <Route path="*" element={<NotFound />} />
            
            </Routes>
        </>
    );
}

export default DoctorDashboard