import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { userInfo } = useContext(ShopContext);

    const fetchUsers = async () => {
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
    };

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchUsers();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

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
        <div className="container" style={{ padding: '2rem 20px' }}>
            <h1>Users</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>NAME</th>
                                <th style={{ padding: '12px' }}>EMAIL</th>
                                <th style={{ padding: '12px' }}>ADMIN</th>
                                <th style={{ padding: '12px' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{user._id}</td>
                                    <td style={{ padding: '12px' }}>{user.name}</td>
                                    <td style={{ padding: '12px' }}>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        {user.isAdmin ? (
                                            <span style={{ color: 'green' }}>Yes</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>No</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => navigate(`/admin/user/${user._id}/edit`)}
                                            style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteHandler(user._id)}
                                            style={{ padding: '5px 10px', color: 'red', cursor: 'pointer' }}
                                        >
                                            Delete
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
