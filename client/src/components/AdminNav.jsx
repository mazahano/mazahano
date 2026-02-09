import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
    return (
        <div className="admin-nav">
            <NavLink to="/admin/productlist" className={({ isActive }) => (isActive ? 'active' : '')}>
                Products
            </NavLink>
            <NavLink to="/admin/userlist" className={({ isActive }) => (isActive ? 'active' : '')}>
                Users
            </NavLink>
            <NavLink to="/admin/orderlist" className={({ isActive }) => (isActive ? 'active' : '')}>
                Orders
            </NavLink>
        </div>
    );
};

export default AdminNav;
