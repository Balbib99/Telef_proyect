/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';

export const Login = () => {

    const { form, changed } = useForm({});
    const [saved, setSaved] = useState("not_saved");

    const loginUser = async (e) => {
        e.preventDefault();

        // Recojo datos del formulario
        let userToLogin = form;

        // Petición al backend
        const request = await fetch(Global.url + "user/login", {
            method: "POST",
            body: JSON.stringify(userToLogin),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await request.json();

        if (data.status == "success") {

            // Guardamos los datos del usuario para persistir la sesión
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user))

            setSaved("login");

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } else {
            setSaved("error");
        }


    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Login</h1>
            </header>

            <div className="content__posts">

                {saved == "login" ?
                    <strong className='alert alert-success'> Usuario identificado correctamente !! </strong>
                    : ""}

                {saved == "error" ?
                    <strong className='alert alert-danger'>El usuario no existe !!</strong>
                    : ""}

                <form onSubmit={loginUser} className="login-form">
                    <div>
                        <label htmlFor="nickLogin">Nick</label>
                        <input type="text" name="nick" id="nickLogin" className="login-input" placeholder="Enter Nickname" onChange={changed} />
                    </div>
                    <div>
                        <label htmlFor="passwordLogin">Password</label>
                        <input type="password" name="password" id="passwordLogin" className="login-input" placeholder="Password" onChange={changed} />
                    </div>
                    <br />
                    <button type="submit" className="login-button">Submit</button>
                </form>

            </div>
        </>
    )
}
