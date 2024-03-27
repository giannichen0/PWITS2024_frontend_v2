import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";
import Modal from "./Modal";
import Footer from "../components/Footer";
import IsMobileContext from "../../context/isMobileProvider";

function Table({ data, accessToken, fetchData }) {
    
    const {isMobile} = useContext(IsMobileContext)
    console.log(isMobile)

    const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];
    const tabella = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [mode, setMode] = useState("");

    useEffect(() => {  
        if(!isMobile){

            $(document).ready(() => {
                $(tabella.current).DataTable(
                    {
                    language: {
                        search: "Ricerca",
                        lengthMenu: "Mostra _MENU_ elementi",
                        info: " _START_ a _END_ elementi su  _TOTAL_ elementi",
                        infoEmpty: "Nessun elemento da mostrare",
                        infoFiltered: "filtro su _MAX_",
                        infoPostFix: "",
                        loadingRecords: "Caricamento in corso...",
                        zeroRecords: "Nesssun elemento da mostrare",
                        emptyTable: "Nessun dato disponibile",
                        paginate: {
                            previous: "precedente",
                            last: "successivo",
                        },
                        aria: {
                            sortAscending: "ordinamento ascendente",
                            sortDescending: ": ordine decrescente",
                        },
                    },
                }
                );
                setTimeout(() => {
                    $(tabella.current)
                        .DataTable()
                        .columns()
                        .header()
                        .to$()
                        .addClass("dt-head-center");
                    $(".dt-length>label>select").css({
                            "width": "50px",
                            
                        });
                }, 10);
            }
            );
        }
    }, []);

    const formatDate = (dateString) => {
        if (typeof dateString === "boolean") {
            return dateString ? "Completato" : "Non completato";
        }

        if (!isNaN(+dateString)) {
            return dateString;
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString;
        }

        // Format the date using toLocaleDateString with Italian locale settings
        return date.toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setMode("edit");
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedItem(id);
        setMode("delete");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem("");
        setMode("");
    };

    const handleMailClick = (item) => {
        axios
            .post(
                process.env.NODE_MODE === "dev"
                    ? `http://localhost:8080/utility/mail`
                    : "https://pwits2024-backend.onrender.com/utility/mail",
                {
                    doctor: item.doctor.split(" ").pop(),
                    patient: item.patient.split(" ").pop(),
                    exam: item._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const handlePdfClick = (item) => {
        axios
            .post(
                process.env.NODE_MODE === "dev"
                    ? `http://localhost:8080/utility/pdf`
                    : "https://pwits2024-backend.onrender.com/utility/pdf",
                {
                    doctorId: item.doctor.split(" ").pop(),
                    patientId: item.patient.split(" ").pop(),
                    examId: item._id,
                    reportId: item.report.split(" ").pop(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    responseType: "blob", // Set responseType to 'blob' to receive blob data in the response
                }
            )
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: "application/pdf",
                });
                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = blobUrl;
                link.target = "_blank"; // Open the link in a new tab

                // Click the link to open the PDF in a new tab
                link.click();

                // Clean up by revoking the Blob URL after the link has been clicked
                URL.revokeObjectURL(blobUrl);
            })
            .catch((err) => console.log(err));
    };

    const handleEditSuccess = () => {
        fetchData();
    };

    const handleDeleteSuccess = () => {
        fetchData();
    };

    if(!isMobile){
        return (
            <>
                <div className="overflow-auto w-full" style={{ height: "60vh" }}>
                    {columnHeaders.length > 0 ? (
                        <table className="" ref={tabella} id="tabella">
                            <thead>
                                <tr>
                                    {columnHeaders.map((header, index) =>
                                        header == "_id" ? (
                                            <th
                                                key={index}
                                                className="border border-slate-600 rounded-md hidden text-center"
                                            >
                                                {header}
                                            </th>
                                        ) : (
                                            <th
                                                key={index}
                                                className="border border-slate-600 rounded-md text-center"
                                            >
                                                {header == "createdAt"
                                                    ? "PRENOTATO IL"
                                                    : header == "name"
                                                    ? "NOME"
                                                    : header == "surname"
                                                    ? "COGNOME"
                                                    : header == "doctor"
                                                    ? "DOTTORE"
                                                    : header == "field"
                                                    ? "CAMPO"
                                                    : header == "content"
                                                    ? "DETTAGLI"
                                                    : header == "completed"
                                                    ? "STATO"
                                                    : header == "patient"
                                                    ? "PAZIENTE"
                                                    : header.toUpperCase()}
                                            </th>
                                        )
                                    )}
                                    <th className="border border-slate-600 rounded-md">
                                        OPERAZIONI
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    const createdAtDate = new Date(item.createdAt);
                                    const currentDate = new Date();
                                    const differenceInDays = Math.floor(
                                        (currentDate - createdAtDate) /
                                            (1000 * 60 * 60)
                                        // *24 differenza in ore cosi.
                                    );
                                    const showMailIcon =
                                        !item.completed &&
                                        item.report &&
                                        differenceInDays > 5;
    
                                    return (
                                        <tr key={index} className="h-14">
                                            {columnHeaders.map((header, idx) =>
                                                header == "_id" ? (
                                                    <td
                                                        key={idx}
                                                        className="border border-slate-700 rounded-md text-center max-w-14 hidden"
                                                    >
                                                        {new Date(
                                                            item[header]
                                                        ).toString() !==
                                                        "Invalid Date" ? (
                                                            formatDate(item[header])
                                                        ) : (
                                                            <div className="overflow-x-auto whitespace-nowrap">
                                                                {item[header]}
                                                            </div>
                                                        )}
                                                    </td>
                                                ) : (
                                                    <td
                                                        key={idx}
                                                        className="border border-slate-700 rounded-md text-center max-w-14"
                                                    >
                                                        {new Date(
                                                            item[header]
                                                        ).toString() !==
                                                        "Invalid Date" ? (
                                                            formatDate(item[header])
                                                        ) : (
                                                            <div className="overflow-x-auto whitespace-nowrap">
                                                                {item[header]}
                                                            </div>
                                                        )}
                                                    </td>
                                                )
                                            )}
                                            <td className="border border-slate-700 rounded-md text-center">
                                                <div className="flex justify-center gap-x-4">
                                                    <button
                                                        onClick={() =>
                                                            handleEditClick(item)
                                                        }
                                                        className="text-2xl text-yellow-600"
                                                    >
                                                        <AiOutlineEdit />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                item._id
                                                            )
                                                        }
                                                        className="text-2xl text-red-600"
                                                    >
                                                        <MdOutlineDelete />
                                                    </button>
                                                    {columnHeaders.includes(
                                                        "completed"
                                                    ) && (
                                                        <button
                                                            onClick={() =>
                                                                handlePdfClick(item)
                                                            }
                                                            className="text-2xl text-red-600"
                                                        >
                                                            <BsFiletypePdf />
                                                        </button>
                                                    )}
    
                                                    {showMailIcon && (
                                                        <button
                                                            onClick={() =>
                                                                handleMailClick(
                                                                    item
                                                                )
                                                            }
                                                            className="text-2xl text-blue-600"
                                                        >
                                                            <RiSendPlaneFill />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <h1>No data</h1>
                    )}
                </div>
                <Modal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    selectedItem={selectedItem}
                    mode={mode}
                    accessToken={accessToken}
                    handleEditSuccess={handleEditSuccess}
                    handleDeleteSuccess={handleDeleteSuccess}
                />
            </>
        );
    }else{
        return <>not</>
    }
}

export default Table;
