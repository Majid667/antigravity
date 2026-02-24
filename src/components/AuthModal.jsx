import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthModal = ({ onClose, onAuth }) => {
    const [mode, setMode] = useState('signin');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Try to sign in with email first
        let signInData = null;
        let signInError = null;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email || username,
            password,
        });

        signInData = data;
        signInError = error;

        if (signInError) {
            setError(signInError.message || 'Invalid email/username or password');
        } else {
            onAuth(signInData.user);
            onClose();
        }
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validate username
        if (!username || username.length < 3) {
            setError('Username must be at least 3 characters long');
            setLoading(false);
            return;
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
            setError('Username can only contain letters, numbers, hyphens, and underscores');
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    username: username,
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
                        <>
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
                            <div className="auth-field">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="john_doe"
                                    required
                                    minLength={3}
                                    pattern="^[a-zA-Z0-9_-]+$"
                                    title="Username can only contain letters, numbers, hyphens, and underscores"
                                />
                                <small className="auth-hint">3+ characters, letters, numbers, hyphens, underscores only</small>
                            </div>
                        </>
                    )}
                    <div className="auth-field">
                        <label>{mode === 'signin' ? 'Email or Username' : 'Email'}</label>
                        <input
                            type={mode === 'signin' ? 'text' : 'email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={mode === 'signin' ? 'you@example.com or john_doe' : 'you@example.com'}
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
                        <>Don't have an account? <button onClick={() => { setMode('signup'); setError(''); setSuccess(''); setEmail(''); setUsername(''); setPassword(''); setFullName(''); }}>Sign Up</button></>
                    ) : (
                        <>Already have an account? <button onClick={() => { setMode('signin'); setError(''); setSuccess(''); setEmail(''); setUsername(''); setPassword(''); setFullName(''); }}>Sign In</button></>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
