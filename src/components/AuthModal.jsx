import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthModal = ({ onClose, onAuth }) => {
    const [mode, setMode] = useState('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            onAuth(data.user);
            onClose();
        }
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            setError(error.message);
        } else {
            if (data.user && data.user.identities && data.user.identities.length === 0) {
                setError('An account with this email already exists.');
            } else {
                setSuccess('Account created! Check your email for a confirmation link, or sign in directly.');
                setMode('signin');
                setPassword('');
            }
        }
        setLoading(false);
    };



    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close" onClick={onClose}>✕</button>

                <div className="auth-header">
                    <div className="auth-logo">
                        <span className="logo-icon">O</span>
                        <span>Opus Clip</span>
                    </div>
                    <h2>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
                    <p>{mode === 'signin' ? 'Sign in to your account' : 'Start creating viral clips today'}</p>
                </div>

                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}

                <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}>
                    {mode === 'signup' && (
                        <div className="auth-field">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    )}
                    <div className="auth-field">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="auth-submit" disabled={loading}>
                        {loading ? (
                            <span className="auth-spinner"></span>
                        ) : (
                            mode === 'signin' ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </form>

                <p className="auth-switch">
                    {mode === 'signin' ? (
                        <>Don't have an account? <button onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}>Sign Up</button></>
                    ) : (
                        <>Already have an account? <button onClick={() => { setMode('signin'); setError(''); setSuccess(''); }}>Sign In</button></>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
