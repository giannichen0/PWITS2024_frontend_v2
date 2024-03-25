import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../../components/Modal";

const PatientProfile = ({ accessToken, role }) => {
    const [paziente, setPaziente] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState("");

    const handleUpdate = () => {
        setIsModalOpen(true);
        setMode("edit");
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMode("");
    };

    useEffect(() => {
        if (!accessToken || role !== "patient") {
            navigate("/");
        } else {
            setLoading(true);
            const getPaziente = async () => {
                try {
                    const response = await axios.get(
                        process.env.NODE_MODE === "dev"
                            ? `http://localhost:8080/patient/profile`
                            : "https://pwits2024-backend.onrender.com/patient/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    setPaziente(response.data);
                } catch (error) {
                    console.error("Error fetching doctors:", error);
                } finally {
                    setLoading(false);
                }
            };
            getPaziente();
        }
    }, []);

    return (
      <div className="min-h-full h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-[#F6F3F9]">
          {loading ? (
              <Spinner></Spinner>
          ) : (
              <div>
                  <div>
                      <div className="flex justify-center align-middle mt-4">
                          <h2 className="text-2xl font-bold mb-4 mr-5">
                              Info del Paziente
                          </h2>
                          <button
                              className="text-4xl text-yellow-600 text-center mb-4"
                              onClick={handleUpdate}
                          >
                              <AiOutlineEdit />
                          </button>
                      </div>

                      <div>
                          <p>
                              <strong>Nome:</strong> {paziente.name}
                          </p>
                          <p>
                              <strong>Cognome:</strong> {paziente.surname}
                          </p>
                          <p>
                              <strong>Email:</strong> {paziente.email}
                          </p>
                          <p>
                              <strong>telefono:</strong> {paziente.telefono}
                          </p>
                  
                      </div>
                  </div>
              </div>
          )}
          <Modal
              isOpen={isModalOpen}
              closeModal={closeModal}
              mode={mode}
              accessToken={accessToken}
              
          />
      </div>
  );
};

export default PatientProfile;
