import React, { useEffect, useRef, useState } from 'react';

const DemoVideoModal = ({ onClose }) => {
    const videoRef = useRef(null);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        // Start playing when component mounts
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("[v0] Auto-play was prevented:", error);
            });
        }

        // Handle ESC key to close modal
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleVideoError = () => {
        console.log("[v0] Video failed to load, attempting fallback");
        setVideoError(true);
    };

    return (
        <div className="demo-video-overlay" onClick={onClose}>
            <div className="demo-video-container" onClick={(e) => e.stopPropagation()}>
                <button className="demo-video-close" onClick={onClose}>✕</button>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    controls
                    className="demo-video-player-fullscreen"
                    onError={handleVideoError}
                    poster="/demo-thumbnail.jpg"
                >
                    <source src="/demo-video.mp4" type="video/mp4" />
                    {!videoError && (
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-man-working-at-his-laptop-in-a-coffee-shop-4264-large.mp4" type="video/mp4" />
                    )}
                    <p className="video-fallback">Your browser does not support the video tag. Please try a different browser.</p>
                </video>
                {videoError && (
                    <div className="video-error-message">
                        <p>Unable to load demo video. Using fallback video...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemoVideoModal;
