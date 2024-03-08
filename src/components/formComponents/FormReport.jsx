import React, { useEffect, useState } from "react";
import { reportFields } from "../../../constants/FormFields";

const FormReport = ({
    handleChange,
    handleUpdate,
    closeModal,
    selectedDoctor,
    getDoctor,
    dottori,
    selectedPatient,
    getPatient,
    pazienti,
    mode,
    user
}) => {
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        getPatient();
        if(user === "admin") getDoctor()
    }, []);

    //filtraggio per fare coincidere il dottore 
    useEffect(() => {
        if (selectedPatient && dottori.length > 0) {
            // Find the selected patient's doctor ID
            const patient = pazienti.find((p) => p._id === selectedPatient);
            const doctorId = patient?.doctor.split(" ").pop();

            // Filter doctors based on the patient's doctor ID
            const filteredDocs = dottori.filter((doc) => doc._id === doctorId);

            // Update the filteredDoctors state with the filtered list
            setFilteredDoctors(filteredDocs);
        } else {
            // If no patient is selected or no doctors are available, set all doctors
            setFilteredDoctors(dottori);
        }
    }, [selectedPatient, dottori, pazienti]);

    return (
        <form className="bg-[#F6F3F9] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {reportFields.map((field) => (
                <div key={field.id}>
                    <label
                        htmlFor={field.labelFor}
                        className="block text-sm pt-2 font-medium text-gray-700"
                    >
                        {field.labelText === "doctor" && user === "doctor" ? "" :field.labelText}
                    </label>
                    {field.name === "doctor" && user === "admin" ? (
                        <select
                            name={field.name}
                            id={field.id}
                            autoComplete="off"
                            required={field.isRequired}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={selectedDoctor}
                            onChange={handleChange}
                        >
                            <option value="">seleziona paziente</option>
                            {/* Map over the filtered list of doctors and create an option for each one */}
                            {filteredDoctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    ) : field.name === "doctor" && user === "doctor" ? <></> : field.name === "patient" ? (
                        <select
                            name={field.name}
                            id={field.id}
                            autoComplete="off"
                            required={field.isRequired}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={selectedPatient}
                            onChange={handleChange}
                        >
                            <option value="">{mode ==="edit" ? "seleziona il paziente o lascia vuoto" : "seleziona il paziente"}</option>

                            {/* Map over the list of patients and create an option for each one */}
                            {pazienti.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                    ) :field.name  === "doctor" && user ==="doctor" ? <></>: (
                        <input
                            type={field.type}
                            name={field.name}
                            id={field.id}
                            autoComplete="off"
                            required={field.isRequired}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
            <div className="bg-[#F6F3F9] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto"
                >
                    {mode === "edit" ? "Modifica" : "Aggiungi"}
                </button>
                <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Annulla
                </button>
            </div>
        </form>
    );
};

export default FormReport;
