import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FormCRUD from "./formComponents/FormCRUD";

function Modal({ isOpen, closeModal, selectedItem="", mode, accessToken, handleEditSuccess,handleDeleteSuccess}) {


    const [loading, setLoading] = useState(false);

    const location = useLocation();
    
    const userType = location.pathname.split("/")[1]

    let url = "";
    const pathSegments = location.pathname.split("/");
    if (pathSegments.length <= 2) {
        url = "doctors";
    } else {
        url = pathSegments[2];
    }

    



    

    const handleDelete = async () => {
        setLoading(true);
        if(userType === "admin"){
            try {
                await axios.delete(process.env.NODE_MODE === "dev" ? `http://localhost:8080/admin/${url}`: `https://pwits2024-backend.onrender.com/admin/${url}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: {
                        id: selectedItem,
                    },
                });
                closeModal();
                handleDeleteSuccess()
                
                
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
                closeModal();
                handleDeleteSuccess()

               

            }
        }
        if(userType === "doctor"){
            try {
                await axios.delete(process.env.NODE_MODE === "dev" ? `http://localhost:8080/doctor/${url}`:`https://pwits2024-backend.onrender.com/doctor/${url}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: {
                        id: selectedItem,
                    },
                });
                closeModal();
                handleDeleteSuccess()

                
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
                closeModal();
                handleDeleteSuccess()

            }
        }
    };
    
    const editMode = isOpen && (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-[#F6F3F9] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:h-5/6">
                        <div className="bg-[#F6F3F9] px-4 xl:pb-4 xl:pt-5">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title"
                                    >
                                        Modifica
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Modifica dell'elemento{" "}
                                            {selectedItem._id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <FormCRUD
                            url={url}
                            accessToken={accessToken}
                            closeModal={closeModal}
                            element={selectedItem}
                            user={userType}
                            handleEditSuccess={handleEditSuccess}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const deleteMode = isOpen && (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-[#F6F3F9] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title"
                                    >
                                        Eliminazione
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Sei sicuro di eliminare l'elemento{" "}
                                            {selectedItem}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F6F3F9] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700 sm:ml-3 sm:w-auto"
                            >
                                Elimina
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Annulla
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const addMode = isOpen && (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-[#F6F3F9] text-left shadow-xl transition-all sm:my-8 max-sm:w-5/6">
                        <div className="bg-[#F6F3F9] px-4 pb-4 pt-5 ">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title"
                                    >
                                        Aggiungi
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Aggiungi elemento
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FormCRUD
                            url={url}
                            accessToken={accessToken}
                            closeModal={closeModal}
                            mode = "add"
                            user = {userType}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    return mode === "edit" ? editMode : mode === "add" ? addMode : deleteMode;
}

export default Modal;
