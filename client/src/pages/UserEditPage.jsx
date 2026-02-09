import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { FaArrowLeft } from 'react-icons/fa';

const UserEditPage = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');

    const navigate = useNavigate();
    const { userInfo } = useContext(ShopContext);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`/api/users/${userId}`, config);
                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.put(`/api/users/${userId}`, {
                name,
                email,
                isAdmin,
            }, config);

            setUpdateLoading(false);
            navigate('/admin/userlist');
        } catch (err) {
            setUpdateError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setUpdateLoading(false);
        }
    };

    return (
        <div className="admin-form-container">
            <Link to="/admin/userlist" className="back-link">
                <FaArrowLeft style={{ marginRight: '8px' }} /> GO BACK
            </Link>

            <h1 className="admin-form-title">Edit User</h1>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <form onSubmit={submitHandler}>
                    {updateError && <p style={{ color: 'red', marginBottom: '1rem' }}>{updateError}</p>}

                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="isAdmin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <label htmlFor="isAdmin" style={{ cursor: 'pointer', fontWeight: '500' }}>Is Admin</label>
                    </div>

                    <button type="submit" className="btn btn-black" style={{ width: '100%' }} disabled={updateLoading}>
                        {updateLoading ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default UserEditPage;
