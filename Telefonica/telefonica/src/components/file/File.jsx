/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';

export const File = () => {
    const [files, setFiles] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [stored, setStored] = useState("not_stored");

    const [selectedFileName, setSelectedFileName] = useState(null);

    //Control de la paginación de archivos
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    //Calculamos el rango de elementos a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

    //Controles de paginación
    const totalPages = Math.ceil(files.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFileName(e.target.files[0].name);
        } else {
            setSelectedFileName(null);
        }
    };

    const fetchData = async () => {
        try {
            const request = await fetch(Global.url + "file/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });

            const data = await request.json();

            if (data.status === "success") {
                setFiles(data.files);

            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const sendFile = async (e) => {
        e.preventDefault();

        const fileInput = document.querySelector("#file0");

        if (fileInput.files[0]) {

            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);

            const uploadRequest = await fetch(Global.url + "file/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
            });

            const uploadData = await uploadRequest.json();

            if (uploadData) {
                setStored("stored");
                setSelectedFileName(null);

                setTimeout(() => {
                    setStored("not_stored");
                    fetchData();
                }, 2000);
            } else {
                setStored("error");
            }
        }
    };



    return (
        <>
            <div className='containerFile'>
                <div className='container'>
                    <h1>Lista de Archivos</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Buscar archivo"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <ul className="files">
                            {currentItems.length > 0 ? (
                                currentItems.map((file) => (
                                    <li key={file.fileName}>
                                        <button
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                window.open(file.fileUrl, '_blank');
                                            }}
                                        >
                                            {file.fileName}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li>No hay archivos</li>
                            )}
                        </ul>

                        <div>
                            {/* Controles de Paginación */}
                            <button type="button" onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage - 1)
                            }}>Página Anterior</button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button type="button" onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1)
                            }}>Página Siguiente</button>

                            {/* Lista de Archivos */}
                            <ul className="files">
                                {/* ... Código de Renderización de Elementos Actuales */}
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="container">
                    <h1>Subir Archivo</h1>

                    {stored === "stored" && (
                        <strong className='alert alert-success'> Archivo guardado correctamente !! </strong>
                    )}

                    {stored === "error" && (
                        <strong className='alert alert-danger'>Ha ocurrido algún error</strong>
                    )}

                    <form className='files-form' onSubmit={sendFile}>
                        <input
                            type="file"
                            name="file0"
                            id="file0"
                            accept=".pdf, .doc, .docx, .txt .csv"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file0" className='fileLabel'>
                            {selectedFileName ? selectedFileName : "Selecciona un archivo"}
                        </label>
                        <button type="submit">Subir</button>
                    </form>
                </div>
            </div>
        </>
    );
};
