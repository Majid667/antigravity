import React from 'react';

const Features = () => {
    const features = [
        {
            title: "ClipAnything",
            description: "AI that turns any genre — vlogs, gaming, sports — into viral clips in 1 click.",
            tag: "Powerful"
        },
        {
            title: "ReframeAnything",
            description: "Keeps moving subjects centered automatically across all platforms.",
            tag: "Smart"
        },
        {
            title: "AI B-Roll",
            description: "Get relevant AI B-Roll in 1 click, under 1 minute for every clip.",
            tag: "Fast"
        }
    ];

    return (
        <section id="features" className="features">
            <div className="container">
                <div className="section-header">
                    <h2>AI that edits with you,<br />not just for you</h2>
                    <p>The most powerful AI editing models built for speed and creative flexibility.</p>
                </div>
                <div className="feature-grid">
                    {features.map((f, i) => (
                        <div key={i} className="feature-card">
                            <div className="feature-tag">{f.tag}</div>
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>
                            <div className="feature-link">Learn more →</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
