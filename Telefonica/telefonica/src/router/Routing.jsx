/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, Link } from 'react-router-dom'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Login } from '../components/user/Login'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { Header } from '../components/layout/private/Header'
import {Rpc} from '../components/rpc/Rpc'
import { Ctu } from '../components/ctu/Ctu'
import { Contact } from '../components/contact/Contact'
import { File } from '../components/file/File'

export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Grupo de rutas para lo público */}
                <Route path='/' element={<PublicLayout />}>
                    <Route index element={<Login />} />
                    <Route path='login' element={<Login />} />
                </Route>

                <Route path='/social' element={<PrivateLayout />}>
                    <Route index element={<Rpc />} />
                    <Route path='/rpc' element={<Rpc />} />
                    <Route path='/ctu' element={<Ctu />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/file' element={<File />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
