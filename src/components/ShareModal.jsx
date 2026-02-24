import React, { useState } from 'react';

const PLATFORMS = [
    { id: 'youtube', name: 'YouTube', icon: '▶', color: '#FF0000', bgColor: 'rgba(255, 0, 0, 0.1)' },
    { id: 'tiktok', name: 'TikTok', icon: '♪', color: '#00F2EA', bgColor: 'rgba(0, 242, 234, 0.1)' },
    { id: 'instagram', name: 'Instagram', icon: '◎', color: '#E1306C', bgColor: 'rgba(225, 48, 108, 0.1)' },
    { id: 'facebook', name: 'Facebook', icon: 'f', color: '#1877F2', bgColor: 'rgba(24, 119, 242, 0.1)' },
];

const ShareModal = ({ clip, onClose }) => {
    const [connectedPlatforms, setConnectedPlatforms] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [caption, setCaption] = useState(`Check out this clip! 🔥 ${clip?.title || ''}`);
    const [tags, setTags] = useState('#viral #shorts #trending #fyp #content');
    const [step, setStep] = useState('share'); // 'share' or 'publishing' or 'done'
    const [publishProgress, setPublishProgress] = useState({});

    const toggleConnect = (platformId) => {
        setConnectedPlatforms(prev =>
            prev.includes(platformId)
                ? prev.filter(p => p !== platformId)
                : [...prev, platformId]
        );
        // Auto-select when connecting
        if (!connectedPlatforms.includes(platformId)) {
            setSelectedPlatforms(prev =>
                prev.includes(platformId) ? prev : [...prev, platformId]
            );
        }
    };

    const toggleSelect = (platformId) => {
        if (!connectedPlatforms.includes(platformId)) return;
        setSelectedPlatforms(prev =>
            prev.includes(platformId)
                ? prev.filter(p => p !== platformId)
                : [...prev, platformId]
        );
    };

    const handlePublish = () => {
        if (selectedPlatforms.length === 0) return;
        setStep('publishing');

        const progress = {};
        selectedPlatforms.forEach(p => { progress[p] = 0; });
        setPublishProgress(progress);

        // Simulate publishing to each platform sequentially
        selectedPlatforms.forEach((platformId, index) => {
            setTimeout(() => {
                setPublishProgress(prev => ({ ...prev, [platformId]: 50 }));
            }, (index * 1500) + 500);

            setTimeout(() => {
                setPublishProgress(prev => ({ ...prev, [platformId]: 100 }));
            }, (index * 1500) + 1200);
        });

        // All done
        setTimeout(() => {
            setStep('done');
        }, (selectedPlatforms.length * 1500) + 500);
    };

    return (
        <div className="share-overlay" onClick={onClose}>
            <div className="share-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close" onClick={onClose}>✕</button>

                {step === 'share' && (
                    <>
                        <div className="share-header">
                            <h2>Share to Social Media</h2>
                            <p>Publish "{clip?.title}" to your connected platforms</p>
                        </div>

                        {/* Platform Connection */}
                        <div className="share-section">
                            <label className="share-label">Connect & Select Platforms</label>
                            <div className="platforms-grid">
                                {PLATFORMS.map(platform => {
                                    const isConnected = connectedPlatforms.includes(platform.id);
                                    const isSelected = selectedPlatforms.includes(platform.id);
                                    return (
                                        <div key={platform.id} className={`platform-card ${isConnected ? 'connected' : ''} ${isSelected ? 'selected' : ''}`}>
                                            <div className="platform-top" onClick={() => toggleSelect(platform.id)}>
                                                <div className="platform-icon" style={{ background: platform.bgColor, color: platform.color }}>
                                                    {platform.icon}
                                                </div>
                                                <span className="platform-name">{platform.name}</span>
                                                {isConnected && isSelected && <span className="platform-check">✓</span>}
                                            </div>
                                            <button
                                                className={`platform-connect-btn ${isConnected ? 'disconnect' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); toggleConnect(platform.id); }}
                                            >
                                                {isConnected ? 'Disconnect' : 'Connect'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="share-section">
                            <label className="share-label">Caption</label>
                            <textarea
                                className="share-textarea"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                rows={3}
                                placeholder="Write a caption for your clip..."
                            />
                        </div>

                        {/* Tags */}
                        <div className="share-section">
                            <label className="share-label">Tags</label>
                            <input
                                className="share-input"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="#viral #shorts #trending"
                            />
                        </div>

                        {/* Publish Button */}
                        <button
                            className="share-publish-btn"
                            onClick={handlePublish}
                            disabled={selectedPlatforms.length === 0}
                        >
                            {selectedPlatforms.length === 0
                                ? 'Connect a platform to share'
                                : `Publish to ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''}`
                            }
                        </button>
                    </>
                )}

                {step === 'publishing' && (
                    <div className="share-publishing">
                        <h2>Publishing Your Clip...</h2>
                        <p>Uploading to your connected platforms</p>
                        <div className="publishing-list">
                            {selectedPlatforms.map(platformId => {
                                const platform = PLATFORMS.find(p => p.id === platformId);
                                const progress = publishProgress[platformId] || 0;
                                return (
                                    <div key={platformId} className="publishing-item">
                                        <div className="publishing-platform">
                                            <span className="platform-icon-sm" style={{ background: platform.bgColor, color: platform.color }}>
                                                {platform.icon}
                                            </span>
                                            <span>{platform.name}</span>
                                        </div>
                                        <div className="publishing-bar">
                                            <div className="publishing-fill" style={{ width: `${progress}%`, background: platform.color }}></div>
                                        </div>
                                        <span className="publishing-status">
                                            {progress === 0 ? 'Waiting...' : progress < 100 ? 'Uploading...' : '✓ Done'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {step === 'done' && (
                    <div className="share-done">
                        <div className="share-done-icon">🎉</div>
                        <h2>Published Successfully!</h2>
                        <p>Your clip "{clip?.title}" has been shared to {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}.</p>
                        <div className="share-done-platforms">
                            {selectedPlatforms.map(platformId => {
                                const platform = PLATFORMS.find(p => p.id === platformId);
                                return (
                                    <div key={platformId} className="done-platform-badge" style={{ background: platform.bgColor, borderColor: platform.color }}>
                                        <span style={{ color: platform.color }}>{platform.icon}</span> {platform.name}
                                    </div>
                                );
                            })}
                        </div>
                        <button className="share-publish-btn" onClick={onClose}>Done</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShareModal;
