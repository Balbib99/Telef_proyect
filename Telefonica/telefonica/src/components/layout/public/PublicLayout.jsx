/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicLayout = () => {

  return (
    <>
      {/* Layout */}

      {/* Contenido principal */}
      <section className='layout__content'>
        {!localStorage.getItem("token")?
          <Outlet />
          :
          <Navigate to="/social" />
        }
      </section>
    </>
  )
}
