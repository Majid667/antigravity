import React from 'react';

const Footer = ({ setView }) => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo-wrapper" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
                            <div className="logo">
                                <span className="logo-icon">O</span>
                                Opus Clip
                            </div>
                            <span className="logo-tagline">AI Content Repurposing</span>
                        </div>
                        <p>Scale your creative output and business without scaling overhead.</p>
                    </div>
                    <div className="footer-links">
                        <div>
                            <h4>Product</h4>
                            <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }}>Home</a>
                            <a href="#features" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Features</a>
                            <a href="#pricing" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Pricing</a>
                        </div>
                        <div>
                            <h4>Support</h4>
                            <a href="#" onClick={(e) => { e.preventDefault(); setView('contact'); }}>Contact Us</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setView('about'); }}>About Us</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setView('disclaimer'); }}>Disclaimer</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setView('terms'); }}>Terms of Service</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); setView('privacy'); }}>Privacy Policy</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Opus Clip. All rights reserved.</p>
                    <div className="social-links">
                        <a href="#">Twitter</a>
                        <a href="#">YouTube</a>
                        <a href="#">Discord</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
