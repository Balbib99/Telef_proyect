/* eslint-disable no-undef */
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


    useEffect(() => {
        fetchData();

        // loginOneDrive();
    }, []);

    //DE MOMENTO
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        console.log(file);

        if (file) {
            // Crear un enlace directo al archivo local
            const fileURL = URL.createObjectURL(file);
            console.log(fileURL);

            // Abrir el archivo en una nueva ventana o pestaña
            setTimeout(() => {
                window.open(fileURL);
            }, 500);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFileName(e.target.files[0].name);
            console.log(e.target.files[0]);
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

    // const loginOneDrive = async () => {
    //     try {
    //         const request = await fetch(Global.url + "file/loginOneDrive", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": localStorage.getItem("token")
    //             },
    //             mode: 'no-cors'
    //         });

    //         const data = await request.json();
    //         console.log("ha");

    //         if (data.status === "success") {
    //             console.log("objetivo cumplido camarada");
    //         }
    //     } catch (error) {
    //         console.error("Error loginOneDrive:", error);
    //     }
    // }

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

    // const sendFile = async (e) => {
    //     e.preventDefault();

    //     const fileInput = document.querySelector("#file0");

    //     if (fileInput.files[0]) {

    //         const fileObject = {
    //             name: fileInput.files[0].name,
    //             lastModified: fileInput.files[0].lastModified,
    //             lastModifiedDate: fileInput.files[0].lastModifiedDate,
    //             size: fileInput.files[0].size,
    //             type: fileInput.files[0].type,
    //             webkitRelativePath: fileInput.files[0].webkitRelativePath
    //         };

    //         const file = fileInput.files[0];
    //         console.log(file);

    //         const formData = new FormData();
    //         formData.append("file0", fileInput.files[0]);
    //         formData.append("fileMetadata", JSON.stringify(fileObject));
    //         // formData.append("fileURL", file);

    //         const uploadRequest = await fetch(Global.url + "file/upload", {
    //             method: "POST",
    //             body: formData,
    //             headers: {
    //                 "Authorization": localStorage.getItem("token")
    //             }
    //         });

    //         const uploadData = await uploadRequest.json();

    //         if (uploadData.status === "success") {
    //             setStored("stored");
    //             setSelectedFileName(null);

    //             setTimeout(() => {
    //                 setStored("not_stored");
    //                 fetchData();
    //             }, 2000);
    //         } else {
    //             setStored("error");
    //         }
    //     }
    // };

    const sendFile = async (e) => {
        e.preventDefault();

        const fileInput = document.querySelector("#file0");

        if (fileInput.files[0]) {

            const file = fileInput.files[0];

            const uploadRequest = await fetch(Global.url + "file/upload", {
                method: "POST",
                body: file,
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
                                        {file.file.endsWith(".pdf") ? (
                                            <button onClick={async (e) => {
                                                e.preventDefault();
                                                try {
                                                    const request = await fetch(Global.url + "file/open", {
                                                        method: "POST",
                                                        body: file,
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "Authorization": localStorage.getItem("token")
                                                        }
                                                    });

                                                    const data = await request.json();

                                                    if (data.status === "success") {
                                                        console.log('perfect');
                                                    }
                                                } catch (error) {
                                                    console.error("Error fetching data:", error);
                                                }
                                            }}>
                                                {file.file.split("-")[2]}
                                            </button>
                                        ) : file.file.endsWith(".doc") || file.file.endsWith(".docx") ? (
                                            <a
                                                href={`ms-word:file://C:/Users/balbi/OneDrive/Escritorio/Telef_proyect/Telefonica_api_rest/uploads/files/${file.file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {file.file.split("-")[2]}
                                            </a>
                                        ) : file.file.endsWith(".csv") || file.file.endsWith(".xlsx") ? (
                                            <a
                                                href={`ms-excel:file://C:/Users/balbi/OneDrive/Escritorio/Telef_proyect/Telefonica_api_rest/uploads/files/${file.file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {file.file.split("-")[2]}
                                            </a>
                                        ) : (
                                            // Manejar otros tipos de archivos según sea necesario
                                            <span>Archivo no compatible: {file.file}</span>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No hay archivos</li>
                            )}
                        </ul>


                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button key={page} type="button" onClick={() => handlePageChange(page)} className='paginationBtn'>
                                    {page}
                                </button>

                            ))}
                        </div>

                        <div>
                            <input
                                type="file"
                                name='file1'
                                id='file1'
                                onChange={handleFileInputChange}
                            />
                            <label htmlFor="file1" className='fileLabel' style={{ marginTop: '20px', backgroundColor: '#f54444' }}>
                                {selectedFileName ? selectedFileName : "Selecciona un .pdf"}
                            </label>
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
