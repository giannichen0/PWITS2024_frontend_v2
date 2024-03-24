import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import Spinner from "../../components/Spinner";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../components/Modal";
import Footer from "../../components/Footer"

const AdminDoctor = ({ accessToken, role }) => {
    const navigate = useNavigate();
    const [dottori, setDottori] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState("");

   

    const fetchData = async () => {
        try {
            const response = await axios.get(
                process.env.NODE_MODE === "dev"
                    ? `http://localhost:8080/admin/doctors`
                    : "https://pwits2024-backend.onrender.com/admin/doctors",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setDottori(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!accessToken || role !== "admin") {
            navigate("/");
        } else {
            setLoading(true);

            fetchData()
        }
    }, []);

    const handleAdd = () => {
        setIsModalOpen(true);
        setMode("add");
    };
    const closeModal = async () => {
        setIsModalOpen(false);
        setMode("");
        await fetchData();
       
    };

    return (
        <>
            <div className="min-h-full h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-[#F6F3F9]">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <button
                            className="text-5xl text-purple-600"
                            onClick={handleAdd}
                        >
                            <CiSquarePlus />
                        </button>

                        <Table
                            data={dottori}
                            accessToken={accessToken}
                            fetchData={fetchData}
                        />
                    </>
                )}
                <div className="absolute bottom-0 w-full py-2">
                <Footer ></Footer>
                </div>
                
            </div>
            
            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                mode={mode}
                accessToken={accessToken}
            />
        </>
    );
};

export default AdminDoctor;
