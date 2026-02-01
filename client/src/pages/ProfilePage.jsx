import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { userInfo, login, logout } = useContext(ShopContext);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (name !== userInfo.name) setName(userInfo.name);
            if (email !== userInfo.email) setEmail(userInfo.email);
        }
    }, [navigate, userInfo, name, email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            setLoading(true);
            setMessage(null);
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.put('/api/users/profile', { name, email, password }, config);

                setSuccess(true);
                login(data); // Update context and local storage
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '800px', display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
                <h1>User Profile</h1>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Profile Updated Successfully!</p>}
                {loading && <p>Loading...</p>}

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
                        Update Profile
                    </button>
                </form>

                <button onClick={() => { logout(); navigate('/'); }} className="btn" style={{ marginTop: '2rem', backgroundColor: '#555' }}>
                    Log Out
                </button>
            </div>

            <div style={{ flex: '1.5', minWidth: '300px' }}>
                <h2>My Orders</h2>
                <p>Order history will appear here.</p>
                {/* Order table can be added here once logic is implemented */}
            </div>
        </div>
    );
};

export default ProfilePage;
