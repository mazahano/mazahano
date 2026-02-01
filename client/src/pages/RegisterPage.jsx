import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

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
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const { data } = await axios.post('/api/users', { name, email, password });
                login(data);
                navigate(redirect);
            } catch (err) {
                setMessage(err.response && err.response.data.message ? err.response.data.message : err.message);
            }
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 20px', maxWidth: '500px' }}>
            <h1>Register</h1>
            {message && <p style={{ color: 'red', marginBottom: '1rem' }}>{message}</p>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />
                </div>
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
                <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                    />
                </div>
                <button type="submit" className="btn">REGISTER</button>
            </form>
            <div style={{ marginTop: '1rem' }}>
                Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
