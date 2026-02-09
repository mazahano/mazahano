import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import AdminNav from '../components/AdminNav';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { userInfo } = useContext(ShopContext);

    const fetchUsers = React.useCallback(async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('/api/users', config);
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    }, [userInfo, setError, setUsers, setLoading]);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchUsers();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate, fetchUsers]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`/api/users/${id}`, config);
                setMessage('User deleted successfully');
                fetchUsers();
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            }
        }
    };

    return (
        <div className="admin-container">
            <h1 className="mb-4">Admin Dashboard</h1>
            <AdminNav />

            <div className="admin-header">
                <h2>User Management</h2>
            </div>

            {message && <div className="status-badge status-success mb-2">{message}</div>}
            {error && <div className="status-badge status-danger mb-2">{error}</div>}

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id.substring(0, 10)}...</td>
                                    <td style={{ fontWeight: '500' }}>{user.name}</td>
                                    <td>
                                        <a href={`mailto:${user.email}`} style={{ color: 'var(--color-gray-800)' }}>{user.email}</a>
                                    </td>
                                    <td>
                                        {user.isAdmin ? (
                                            <span className="status-badge status-success"><FaCheck /> Admin</span>
                                        ) : (
                                            <span className="status-badge status-danger"><FaTimes /> User</span>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/admin/user/${user._id}/edit`} className="action-btn">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(user._id)}
                                            className="action-btn delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserListPage;
