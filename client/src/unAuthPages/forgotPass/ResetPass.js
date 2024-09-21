import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './password.css';

const ResetPass = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:5000/api/auth/reset-password/${token}`, { password });
            toast.success('Password has been reset');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            toast.error('Error resetting password');
        }
    };

    return (
        <div className='forgotPass'>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                />
                <button className="forgotPassBtn" type="submit">Reset Password</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ResetPass;