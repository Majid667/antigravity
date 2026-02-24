import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthCallback = ({ onAuthComplete }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('Completing authentication...');

    useEffect(() => {
        const handleCallback = async () => {
            try {
                console.log("[v0] Processing OAuth callback...");
                console.log("[v0] Current URL:", window.location.href);
                
                // Wait a moment for Supabase to process the callback
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Get the session from Supabase after OAuth redirect
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                
                console.log("[v0] Session check result:", { session: !!session, error: sessionError });
                
                if (sessionError) {
                    console.log("[v0] Auth session error:", sessionError);
                    setError('Authentication failed. Please try again.');
                    setLoading(false);
                    setTimeout(() => {
                        if (onAuthComplete) onAuthComplete(false);
                        window.location.href = '/';
                    }, 2000);
                    return;
                }

                if (session && session.user) {
                    console.log("[v0] OAuth session established successfully for:", session.user.email);
                    setMessage('Success! Redirecting...');
                    // Notify parent and redirect to home page
                    if (onAuthComplete) onAuthComplete(true, session.user);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 500);
                } else {
                    console.log("[v0] No session found after OAuth");
                    setError('No session established. Please try again.');
                    setMessage('');
                    setTimeout(() => {
                        if (onAuthComplete) onAuthComplete(false);
                        window.location.href = '/';
                    }, 2000);
                }
            } catch (err) {
                console.log("[v0] Callback error:", err);
                setError('An error occurred during authentication. Please try again.');
                setMessage('');
                setTimeout(() => {
                    if (onAuthComplete) onAuthComplete(false);
                    window.location.href = '/';
                }, 2000);
            } finally {
                setLoading(false);
            }
        };

        handleCallback();
    }, [onAuthComplete]);

    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                gap: '20px',
                backgroundColor: '#0f0f23',
                color: '#fff'
            }}>
                <div style={{ color: '#ff6b6b', fontSize: '18px' }}>❌</div>
                <div style={{ color: '#ff6b6b', fontSize: '16px', textAlign: 'center', maxWidth: '400px' }}>{error}</div>
                <p style={{ color: '#999', fontSize: '14px' }}>Redirecting...</p>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: '#0f0f23',
            color: '#fff'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #00d4ff',
                borderTop: '3px solid transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }} />
            <p>{message}</p>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AuthCallback;

