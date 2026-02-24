import React, { useState } from 'react';

const Navbar = ({ setView, onStart, user, onSignIn, onSignOut, theme, toggleTheme }) => {
    const [showFeatures, setShowFeatures] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const features = [
        { icon: '✦', title: 'ClipAnything', desc: 'The fastest way to turn any video into viral shorts' },
        { icon: 'ⓒ', title: 'Animated captions', desc: 'The fastest way to add animated captions' },
        { icon: '↻', title: 'AI Reframe', desc: 'Resize any video for every platform in 1 click', badge: 'Updated' },
        { icon: '◈', title: 'AI B-Roll', desc: 'Get relevant AI B-Roll in 1 click, under 1 minute' },
        { icon: '▦', title: 'Social scheduler', desc: "Schedule a month's posts to all platforms in 10 minutes" },
        { icon: '◧', title: 'Brand template', desc: 'Easily create and add brand templates in 1 click' },
        { icon: '▣', title: 'Editor', desc: 'All-in-one AI editor. No editing skills required' },
        { icon: '⧉', title: 'Export to XML', desc: "Schedule a month's posts to all platforms in 10 minutes" },
        { icon: '⊞', title: 'Team workspace', desc: "Maximize your team's productivity with AI" },
        { icon: '◉', title: 'Thumbnail generator', desc: 'Drop a link & get YouTube thumbnail in 1 click', badge: 'New' },
    ];

    const getUserInitial = () => {
        if (user?.user_metadata?.full_name) {
            return user.user_metadata.full_name.charAt(0).toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    const getUserName = () => {
        return user?.user_metadata?.full_name || user?.email || 'User';
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo-wrapper" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
                    <div className="logo">
                        <span className="logo-icon">O</span>
                        Opus Clip
                    </div>
                    <span className="logo-tagline">AI Content Repurposing</span>
                </div>
                <div className="nav-links">
                    <div
                        className="nav-dropdown-wrapper"
                        onMouseEnter={() => setShowFeatures(true)}
                        onMouseLeave={() => setShowFeatures(false)}
                    >
                        <a href="#features" className="nav-dropdown-trigger" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                            Features <span className="dropdown-arrow">▾</span>
                        </a>
                        {showFeatures && (
                            <div className="features-dropdown">
                                <div className="features-dropdown-grid">
                                    {features.map((f, i) => (
                                        <div key={i} className="dropdown-feature-item" onClick={() => { setShowFeatures(false); setView('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                                            <span className="dropdown-feature-icon">{f.icon}</span>
                                            <div>
                                                <strong>{f.title}</strong>
                                                {f.badge && <span className="dropdown-badge">{f.badge}</span>}
                                                <p>{f.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <a href="#demo" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Demo</a>
                    <a href="#pricing" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Pricing</a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); setView('about'); }}>About</a>

                    <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    {user ? (
                        <div
                            className="user-menu-wrapper"
                            onMouseEnter={() => setShowUserMenu(true)}
                            onMouseLeave={() => setShowUserMenu(false)}
                        >
                            <div className="user-avatar">
                                {getUserInitial()}
                            </div>
                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        <div className="user-avatar-lg">{getUserInitial()}</div>
                                        <div>
                                            <strong>{getUserName()}</strong>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="user-dropdown-divider"></div>
                                    <button className="user-dropdown-item" onClick={onStart}>
                                        🎬 Create Clips
                                    </button>
                                    <button className="user-dropdown-item" onClick={() => setView('contact')}>
                                        💬 Support
                                    </button>
                                    <div className="user-dropdown-divider"></div>
                                    <button className="user-dropdown-item signout" onClick={onSignOut}>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button className="nav-signin" onClick={onSignIn}>Sign In</button>
                            <button className="nav-cta" onClick={onSignIn}>Sign Up</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
