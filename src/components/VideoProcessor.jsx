import React, { useState, useEffect, useRef } from 'react';
import ShareModal from './ShareModal';

const VideoProcessor = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('upload');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [downloadedClips, setDownloadedClips] = useState([]);
    const [toast, setToast] = useState('');
    const [sharingClip, setSharingClip] = useState(null);

    const fileInputRef = useRef(null);

    const [step, setStep] = useState('input'); // 'input', 'settings', 'processing'
    const [aiFeatures, setAiFeatures] = useState({
        clipping: true,
        captioning: true,
        reframe: true,
        broll: false,
        audio: true,
        voiceover: false
    });

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleStart = () => {
        setStep('settings');
    };

    const startProcessing = () => {
        setIsProcessing(true);
        setStep('processing');
        setProgress(0);
    };

    const toggleFeature = (feature) => {
        setAiFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
    };

    useEffect(() => {
        if (isProcessing) {
            const activeFeatures = Object.keys(aiFeatures).filter(f => aiFeatures[f]);
            const steps = [
                { progress: 10, status: 'Uploading video...' },
                ...activeFeatures.map((f, i) => ({
                    progress: 20 + (i * 10),
                    status: `AI ${f.charAt(0).toUpperCase() + f.slice(1)} processing...`
                })),
                { progress: 90, status: 'Finalizing clips...' },
                { progress: 100, status: 'Completed! AI enhanced clips ready.' }
            ];

            let currentStep = 0;
            const interval = setInterval(() => {
                if (currentStep < steps.length) {
                    setProgress(steps[currentStep].progress);
                    setStatus(steps[currentStep].status);
                    currentStep++;
                } else {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isProcessing, aiFeatures]);

    const handleDownload = (clip, index) => {
        if (downloadedClips.includes(index)) return;
        setDownloadedClips(prev => [...prev, index]);
        setToast(`"${clip.title}" downloaded successfully!`);
        setTimeout(() => setToast(''), 3000);
    };

    const [generatedClips, setGeneratedClips] = useState([]);

    const generateClips = () => {
        const count = Math.floor(Math.random() * 9) + 4; // 4 to 12 clips
        const titles = [
            "Epic Moment", "Viral Hook", "Funny Reaction", "Deep Insight",
            "Pro Tip", "Unbelievable!", "Must See", "Game Changer",
            "Hidden Gem", "Expert Advice", "Wild Turn", "The Secret"
        ];
        const tagsPool = ["AI Subtitles", "Auto Reframe", "B-Roll", "Audio Enhance", "AI Voiceover", "AI Clipping"];

        const clips = Array.from({ length: count }, (_, i) => ({
            title: `${titles[i % titles.length]} #${i + 1}`,
            score: Math.floor(Math.random() * 21) + 79, // 79 to 99
            duration: `00:${Math.floor(Math.random() * 50) + 10}`,
            tags: [tagsPool[i % tagsPool.length], tagsPool[(i + 1) % tagsPool.length]]
        }));

        setGeneratedClips(clips);
        setShowResults(true);
    };

    useEffect(() => {
        if (progress === 100) {
            // Wait a small bit for the final progress display before generating
            const timer = setTimeout(() => {
                generateClips();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    if (showResults) {
        return (
            <div className="processor-overlay">
                <div className="processor-modal results-modal">
                    <button className="close-btn" onClick={onClose}>&times;</button>
                    <h2>Your Viral Clips</h2>
                    <p className="results-subtitle">We found {generatedClips.length} high-potential clips from your video.</p>

                    <div className="clips-grid">
                        {generatedClips.map((clip, i) => (
                            <div key={i} className="clip-card">
                                <div className="clip-thumb">
                                    <div className="play-icon">▶</div>
                                    <span className="duration">{clip.duration}</span>
                                </div>
                                <div className="clip-info">
                                    <h4>{clip.title}</h4>
                                    <div className="clip-tags">
                                        {clip.tags.map((tag, j) => <span key={j} className="tag">{tag}</span>)}
                                    </div>
                                    <div className="clip-meta">
                                        <span className="score">Virality Score: {clip.score}</span>
                                    </div>
                                    <div className="clip-buttons">
                                        <button className={`secondary small ${downloadedClips.includes(i) ? 'downloaded' : ''}`} onClick={() => handleDownload(clip, i)}>
                                            {downloadedClips.includes(i) ? '✓ Downloaded' : '↓ Download'}
                                        </button>
                                        <button className="secondary small share-btn" onClick={() => setSharingClip(clip)}>
                                            ↗ Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="results-actions">
                        <button className="primary" onClick={() => { setIsProcessing(false); setShowResults(false); setStep('input'); setDownloadedClips([]); setProgress(0); }}>Process Another</button>
                    </div>
                    {toast && <div className="download-toast">{toast}</div>}
                    {sharingClip && <ShareModal clip={sharingClip} onClose={() => setSharingClip(null)} />}
                </div>
            </div>
        );
    }

    return (
        <div className="processor-overlay">
            <div className="processor-modal">
                <button className="close-btn" onClick={onClose}>&times;</button>

                {step === 'input' && (
                    <>
                        <h2>Ready to go viral?</h2>
                        <div className="tabs">
                            <button
                                className={activeTab === 'upload' ? 'active' : ''}
                                onClick={() => setActiveTab('upload')}
                            >
                                Upload File
                            </button>
                            <button
                                className={activeTab === 'link' ? 'active' : ''}
                                onClick={() => setActiveTab('link')}
                            >
                                Paste Link
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'upload' ? (
                                <div className="upload-area clickable" onClick={handleUploadClick}>
                                    <div className="upload-icon">↑</div>
                                    <p>Drag and drop or <span>browse</span></p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="video/*"
                                        onChange={handleStart}
                                        style={{ display: 'none' }}
                                    />
                                    <button className="primary mini">Choose Video</button>
                                </div>
                            ) : (
                                <div className="link-area">
                                    <input
                                        type="text"
                                        placeholder="Paste a link from YouTube, TikTok, Twitch, or any video URL..."
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}
                                    />
                                    <p className="link-helper">Supports 10+ platforms including YouTube, TikTok, Instagram, and more</p>
                                    <button className="primary" onClick={handleStart} disabled={!videoLink}>
                                        Get Viral Clips
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {step === 'settings' && (
                    <div className="ai-settings">
                        <h2>Customize AI Features</h2>
                        <p>Select which AI models to apply to your video</p>
                        <div className="settings-grid">
                            {Object.keys(aiFeatures).map(feature => (
                                <div
                                    key={feature}
                                    className={`settings-item ${aiFeatures[feature] ? 'active' : ''}`}
                                    onClick={() => toggleFeature(feature)}
                                >
                                    <div className="checkbox">{aiFeatures[feature] ? '✓' : ''}</div>
                                    <div className="settings-label">
                                        AI {feature.charAt(0).toUpperCase() + feature.slice(1)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="primary" onClick={startProcessing}>Start AI Processing</button>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="processing-state">
                        <h3>{status}</h3>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p>{progress}% complete</p>
                        {progress === 100 && (
                            <button className="primary" onClick={() => setShowResults(true)}>View My Clips</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoProcessor;
