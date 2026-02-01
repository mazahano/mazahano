import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { login, userInfo } = useContext(ShopContext);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            login(data);
            navigate(redirect);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '500px' }}>
            <h1>Sign In</h1>
            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                <button type="submit" className="btn">SIGN IN</button>
            </form>
            <div style={{ marginTop: '1rem' }}>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </div>
        </div>
    );
};

export default LoginPage;
