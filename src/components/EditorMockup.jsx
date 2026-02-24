import React, { useEffect, useRef, useState } from 'react';

const EditorMockup = () => {
    const videoRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("[v0] Auto-play was prevented:", error);
            });
        }
    }, []);

    const handleVideoLoad = () => {
        console.log("[v0] Video loaded successfully");
        setVideoLoaded(true);
    };

    const handleVideoError = () => {
        console.log("[v0] Video failed to load, using fallback");
    };

    return (
        <section id="demo" className="editor-mockup">
            <div className="container">
                <div className="section-header">
                    <h2>See Opus Clip in Action</h2>
                    <p>Watch how our AI transforms long videos into viral shorts in seconds.</p>
                </div>
                <div className="mockup-window">
                    <div className="mockup-header">
                        <div className="window-dots">
                            <span></span><span></span><span></span>
                        </div>
                        <div className="mockup-title">Opus Clip - AI Content Repurposing</div>
                    </div>

                    <div className="mockup-body video-demo-body">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="demo-video-player"
                            poster="/demo-thumbnail.jpg"
                            onLoadedData={handleVideoLoad}
                            onError={handleVideoError}
                        >
                            <source src="/demo-video.mp4" type="video/mp4" />
                            <source src="https://assets.mixkit.co/videos/preview/mixkit-man-working-at-his-laptop-in-a-coffee-shop-4264-large.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="video-overlay-play">
                            <div className="play-circle">
                                <span>▶</span>
                            </div>
                        </div>
                    </div>

                    <div className="mockup-footer">
                        <div className="mockup-status">
                            <span className="status-dot green"></span>
                            AI Processing Active
                        </div>
                        <div className="mockup-info">
                            9:16 Reframe Enabled • Multi-language Captions
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorMockup;
