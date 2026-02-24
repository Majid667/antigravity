import React from 'react';

const Hero = ({ onStart, onWatchDemo }) => {
    return (
        <header className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="badge">New: ReframeAnywere 2.0</div>
                    <h1>1 long video, <span className="highlight">10 viral clips.</span><br />Create 10x faster.</h1>
                    <p>The only AI that understands every pixel of your video. Turn long-form content into gold with professional-grade clipping and reframing.</p>
                    <div className="hero-ctas">
                        <button className="primary" onClick={onStart}>Start for Free</button>
                        <button className="secondary" onClick={onWatchDemo}>Watch Demo</button>
                    </div>
                    <div className="hero-stats">
                        <span>Used by 10M+ creators</span>
                        <div className="platform-icons">
                            {/* Placeholder for platform icons */}
                            <span>YouTube</span> • <span>TikTok</span> • <span>Instagram</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
