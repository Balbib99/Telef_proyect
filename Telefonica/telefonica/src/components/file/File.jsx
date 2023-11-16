/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';

export const File = () => {
    const [files, setFiles] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const [stored, setStored] = useState("not_stored");
    
    const [selectedFileName, setSelectedFileName] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 5;

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

    useEffect(() => {
        fetchData();
    }, []);

    const filteredFiles = files.filter(contact =>
        contact.file.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

    const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
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
                }
            });

            const uploadData = await uploadRequest.json();

            if (uploadData.status === "success") {
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
                            {currentFiles.length > 0 ? (
                                currentFiles.map((file) => (
                                    <li key={file._id}>
                                        <a
                                            href={`ms-word:file://C:/Users/balbi/OneDrive/Escritorio/Telefonica_api_rest/uploads/files/${file.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {file.file.split("-")[2]}
                                        </a>
                                    </li>
                                ))
                            ) : <li>No hay archivos</li>}
                        </ul>
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button key={page} type="button" onClick={() => handlePageChange(page)} className='paginationBtn'>
                                    {page}
                                </button>

                            ))}
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
                            accept=".pdf, .doc, .docx, .txt"
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
