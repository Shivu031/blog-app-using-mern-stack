import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './password.css';

const ForgotPass = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/api/auth/forgot-password', { email });
            toast.success('Password reset link sent to your email');
        } catch (error) {
            toast.error('Error sending password reset link', {
                autoClose: 1000,
            });
        }
    };

    return (
        <div className='forgotPass'>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button className="forgotPassBtn" type="submit">Send Password Reset Link</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ForgotPass;