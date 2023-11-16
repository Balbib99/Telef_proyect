/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';

export const Rpc = () => {

  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const formRef = useRef(null);
  const descriptionRef = useRef("");

  const handleButtonClick = async (buttonName) => {

    if (buttonName === "submitBtn") {

      // Recogemos datos del formulario
      let dataForm = form;

      // Peticion al backend
      const request = await fetch(Global.url + "rpc/save", {
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })

      const data = await request.json();

      if (data.status == "success") {

        // Cambiamos el estado del saved para completar la operación 
        setSaved("sended")

        setTimeout(() => {

          setSaved("not_saved");

          formRef.current.reset();

        }, 2000);

      } else {
        setSaved("error")
      }

    } else if (buttonName === "searchBtn") {

      // Recogemos el dato de la busqueda
      let inc = document.querySelector("#inc").value;

      // Peticion al backend
      const request = await fetch(Global.url + "rpc/search", {
        method: "POST",
        body: JSON.stringify({ inc }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })

      const data = await request.json();

      if (data.status == "success") {

        descriptionRef.current.value = data.rpc.description;

      } else {
        setSaved("no_exists")

        setTimeout(() => {
          setSaved("not_saved");
        }, 6000);
      }

    } else if (buttonName === "resetBtn") {
      formRef.current.reset();
    }

  };

  return (
    <>
      <h1>RPC</h1>

      {saved == "sended" ?
        <strong className='alert alert-success'> Rcp guardado correctamente !! </strong>
        : ""}

      {saved == "error" ?
        <strong className='alert alert-danger'>La INC ya existe !!</strong>
        : ""}

      {saved == "no_exists" ?
        <strong className='alert alert-danger'>No se encontraron coincidencias !!</strong>
        : ""}

      <form className='rpcForm' ref={formRef}>
        <div className="form-group ">
          <label htmlFor="inc">INC</label>
          <input type="inc" name='inc' className="form-control" id="inc" placeholder="Enter INC" onChange={changed} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea type="text" ref={descriptionRef} name='description' className="form-control" id="description" placeholder="Descripción" onChange={changed} />
        </div>
        <button type="button" onClick={() => handleButtonClick('submitBtn')} className="btn btn-primary">Submit</button>
        <button type="button" onClick={() => handleButtonClick('searchBtn')} className="btn btn-search">Buscar</button>
        <button type="button" onClick={() => handleButtonClick('resetBtn')} className="btn btn-reset">Reset</button>
      </form>
    </>
  )
}
