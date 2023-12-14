/* eslint-disable no-unused-vars */
import React from 'react'

export const Footer = () => {

    const sesionClose = () => {
        localStorage.clear();

        window.location.replace(`${import.meta.env.VITE_FRONTEND_URL}`);

    }

    return (
        <div className="navbar__additional">
            <button className='additional-button' onClick={sesionClose}>Cerrar Sesión</button>
        </div>
    )
}
