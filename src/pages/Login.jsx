import React, { useState, useContext } from "react";
import Header from "../components/formComponents/Header";
import Input from "../components/formComponents/Input";
import { loginFields } from "../../constants/FormFields";
import axios from "axios";
import Spinner from "../components/Spinner";
import AuthContext from "../../context/authProvider";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Footer from "../components/Footer";



const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {

    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate();

    const { setAccessToken } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    };

    //Handle Login API 
    const authenticateUser = async () => {
        setLoading(true);
        try {
            const response = await axios.post(process.env.NODE_MODE === "dev" ? "http://localhost:8080/auth": "https://pwits2024-backend.onrender.com/auth", {
                email: loginState.email,
                password: loginState.password,
            });
            const accessToken = response.data.accessToken; // Access token from response.data

            setAccessToken(accessToken + "\t" + response.data.role);

            setLoading(false);
            if (response.data.role === "admin") navigate("/admin");
            if (response.data.role === "doctor") navigate("/doctor");
            if (response.data.role === "patient") navigate("/patient");
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const content = (
        <div className="max-w-md w-full space-y-8">
            <Header heading="Effetua l'accesso" />
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                    {fields.map((field) => (
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                >
                    Login
                </button>
            </form>
        </div>
    );

    return (
        <div className="min-h-full h-screen flex items-center justify-between flex-col py-8 px-4 sm:px-6 lg:px-8 bg-[#F6F3F9]">
            <Title></Title>
            {loading ? <Spinner /> : content}
            <Footer></Footer>
        </div>
    );
};

export default Login;
