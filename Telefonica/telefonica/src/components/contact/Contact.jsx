/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Global } from '../../helpers/Global';
import { useForm } from '../../hooks/useForm';

export const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { form, changed } = useForm({});
    const [saved, setSaved] = useState("not_sended");
    const formRef = useRef(null);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 5;

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {
        try {
            const request = await fetch(Global.url + "contact/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });

            const data = await request.json();

            if (data.status === "success") {
                setContacts(data.contacts);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
    const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleButtonClick = async (buttonName) => {
        if (buttonName === "submitBtn") {
            let dataForm = form;
            const request = await fetch(Global.url + "contact/save", {
                method: "POST",
                body: JSON.stringify(dataForm),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });

            const data = await request.json();

            if (data.status === "success") {

                setSaved("sended");

                setTimeout(() => {
                    setSaved("not_saved");
                    formRef.current.reset();
                }, 2000);

                fetchData();

            } else {

                setSaved("error");

            }
        } else if (buttonName === "resetBtn") {
            formRef.current.reset();
        }
    };

    return (
        <div className='containerFile'>
            <div className='container'>
                <h1>Lista de Contactos</h1>

                <input
                    type="text"
                    placeholder="Buscar contacto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <ul className='contacts'>
                    {currentContacts.map((contact) => (
                        <li key={contact._id}>{contact.name} - {contact.number}</li>
                    ))}
                </ul>

                <div className="pagination">

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} onClick={() => handlePageChange(page)} className='paginationBtn'>
                            {page}
                        </button>
                    ))}

                </div>
            </div>
            <div className='container'>

                <h1>Nuevo Contacto</h1>

                {saved === "sended" && (
                    <strong className='alert alert-success'> Contacto guardado correctamente !! </strong>
                )}
                {saved === "error" && (
                    <strong className='alert alert-danger'>El Nombre de Contacto ya existe !!</strong>
                )}

                <form className='contactForm' ref={formRef}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' className="form-control" id="name" placeholder="Enter Name" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Número</label>
                        <input type="number" name='number' className="form-control" id="number" placeholder="Numero" onChange={changed} />
                    </div>
                    <button type="button" onClick={() => handleButtonClick('submitBtn')} className="btn btn-primary">Submit</button>
                    <button type="button" onClick={() => handleButtonClick('resetBtn')} className="btn btn-reset">Reset</button>
                </form>

            </div>
        </div>
    );
};
