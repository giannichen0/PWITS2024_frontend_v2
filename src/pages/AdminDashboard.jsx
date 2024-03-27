import React, { useEffect, useContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import AuthContext from "../../context/authProvider";
import NavbarMio from "../components/NavbarMio";
import AdminReport from "./admin/AdminReport";
import AdminPatient from "./admin/AdminPatient";
import AdminExam from "./admin/AdminExam";
import AdminDoctor from "./admin/AdminDoctor";
import NotFound from "./NotFound";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const { accessToken } = useContext(AuthContext);
    
    const role = accessToken.split("\t")[1]
    useEffect(() => {
        if (!accessToken || role!== "admin") 
            navigate("/");
        
    }, []);

    return (
        <>
            <NavbarMio />
            <Routes>
                <Route
                    path="/"
                    element={
                        <AdminDoctor accessToken={accessToken.split("\t")[0]} role={role} />
                    }
                />
                <Route
                    path="/patients"
                    element={
                        <AdminPatient
                            accessToken={accessToken.split("\t")[0]}
                            role = {role}
                        />
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <AdminReport accessToken={accessToken.split("\t")[0]} role={role}/>
                    }
                />
                <Route
                    path="/exams"
                    element={
                        <AdminExam accessToken={accessToken.split("\t")[0]} role={role}/>
                    }
                />
                <Route path="*" element={<NotFound />} />
            
            </Routes>
        </>
    );
};

export default AdminDashboard;
