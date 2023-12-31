import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PrivateRoute from './PrivateRoute';
import User from '../User/User';
import Group from '../Group/Group';
import Role from '../Role/Role';



const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<PrivateRoute component={<>Hello home</>} />} />
                <Route path="/user" element={<PrivateRoute component={<User />} />} />
                <Route path="/project" element={<PrivateRoute component={<>Hello project</>} />} />
                <Route path="/about" element={<PrivateRoute component={<>Hello about</>} />} />
                <Route path="/role" element={<PrivateRoute component={<Role />} />} />
                <Route path="/group" element={<PrivateRoute component={<Group />} />} />
            </Routes>
        </>
    );
};

export default AppRoute;