import React, { useEffect, useRef } from 'react';

const DemoVideoModal = ({ onClose }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Start playing when component mounts
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Auto-play was prevented:", error);
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
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-man-working-at-his-laptop-in-a-coffee-shop-4264-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default DemoVideoModal;
