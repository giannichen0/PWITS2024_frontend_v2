import React from "react";
import Title from "../components/Title";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-full h-screen flex items-center justify-between flex-col py-8 px-4 sm:px-6 lg:px-8 bg-[#F6F3F9]">
            <Title></Title>
            <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                PAGINA NON TROVATA 😅
            </h1>
            <p className="text-center mt-2">
                    Torna alla{" "}
                    <Link to="/" className="text-purple-700 hover:underline">
                        pagina di Login
                    </Link>
                </p>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default NotFound;
