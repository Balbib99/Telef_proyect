/* eslint-disable no-unused-vars */
import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { Footer } from './Footer'

export const PrivateLayout = () => {

    return (
      <>
        {/* Layout */}

        {/* Cabecera */}
        <Header />

        {/* Contenido principal */}
        <div >
          {localStorage.getItem("token") ?
            <Outlet />
            :
            <Navigate to="/login" />
          }
        </div>

        <br/>
        <Footer />

      </>
    )
}
