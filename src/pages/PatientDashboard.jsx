import React, { useEffect, useContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import AuthContext from "../../context/authProvider";
import NavbarDoctor from "../components/NavbarDoctor"
import NotFound from "./NotFound";
import PatientDoctor from "./patient/PatientDoctor";
import PatientExam from "./patient/PatientExam";
import ReportPatient from "./patient/ReportPatient";

const PatientDashboard = () => {
  const navigate = useNavigate();

    const { accessToken } = useContext(AuthContext);
    const role = accessToken.split("\t")[1]
    console.log(role)
    useEffect(() => {
        if (!accessToken || role!== "patient") 
            navigate("/");
        
    }, []);
  return (
    <div>PatientDashboard</div>
  )
}

export default PatientDashboard