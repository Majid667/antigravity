import React from 'react';

const Pricing = () => {
    const plans = [
        {
            name: "Basic",
            subtitle: "For hobbyists & beginners",
            price: "$0",
            period: "Free forever",
            billing: null,
            button: "Get Started Free",
            highlight: false,
            features: [
                { text: '30 credits', bold: true, sub: '(1 credit = 1 min of video)' },
                { text: 'AI clipping with Virality Score' },
                { text: 'AI animated captions in 5 languages' },
                { text: 'Download with watermark' },
                { text: 'Basic editor' },
                { text: 'Standard support' },
            ]
        },
        {
            name: "Starter",
            subtitle: "For individual creators",
            price: "$15",
            period: "/mo",
            billing: "$15 billed monthly",
            button: "Free trial for 3 days",
            buttonSub: "No credit card required",
            highlight: false,
            features: [
                { text: '150 credits', bold: true, sub: 'per month (1 credit = 1 min)' },
                { text: 'AI clipping with Virality Score' },
                { text: 'AI animated captions in 20+ languages' },
                { text: 'Auto post to YouTube Shorts, TikTok, IG Reels, or download' },
                { text: 'Powerful editor' },
                { text: '1 brand template' },
                { text: 'Filler & silence removal' },
                { text: 'Remove Watermark' },
            ]
        },
        {
            name: "Pro",
            subtitle: "For professional creators, marketers, & teams",
            price: "$29",
            period: "/mo",
            billing: "$29 billed monthly",
            button: "Upgrade to Pro - Free trial for 3 days",
            buttonSub: "No credit card required",
            highlight: true,
            badge: "Most Popular",
            features: [
                { text: '300 credits', bold: true, sub: 'per month (1 credit = 1 min)' },
                { text: 'Team workspace with 2 seats' },
                { text: '2 brand templates' },
                { text: '6 social account connections' },
            ],
            extraLabel: 'Everything in Starter plan, plus:',
            extraFeatures: [
                { text: 'AI B-roll' },
                { text: 'Input from 10+ sources' },
                { text: 'Export to Adobe Premiere Pro & DaVinci Resolve' },
                { text: 'Multiple aspect ratios (9:16, 1:1, 16:9)' },
                { text: 'Social media scheduler' },
                { text: 'Intercom chat support' },
                { text: 'Custom fonts' },
                { text: 'Speech enhancement' },
            ]
        }
    ];

    return (
        <section id="pricing" className="pricing">
            <div className="container">
                <div className="section-header">
                    <h2>Simple, Transparent Pricing</h2>
                    <p>Choose the plan that's right for your creative journey.</p>
                    <span className="pricing-save-badge">Save up to 50% with annual billing</span>
                </div>
                <div className="pricing-grid three-col">
                    {plans.map((p, i) => (
                        <div key={i} className={`pricing-card ${p.highlight ? 'popular' : ''}`}>
                            {p.badge && <div className="popular-tag">{p.badge}</div>}
                            <div className="pricing-card-top">
                                <h3>{p.name}</h3>
                                <p className="pricing-subtitle">{p.subtitle}</p>
                                <div className="price">
                                    {p.price}<span className="price-period">{p.period}</span>
                                </div>
                                <button className={`pricing-btn ${p.highlight ? 'highlight' : ''}`}>
                                    {p.button}
                                </button>
                                {p.buttonSub && <p className="pricing-btn-sub">{p.buttonSub}</p>}
                                {p.billing && <p className="pricing-billing">{p.billing} ⓘ</p>}
                            </div>

                            <ul className="pricing-features">
                                {p.features.map((f, j) => (
                                    <li key={j}>
                                        <span className="feature-check">✓</span>
                                        <span>
                                            {f.bold ? <strong>{f.text}</strong> : f.text}
                                            {f.sub && <span className="feature-sub"> {f.sub}</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {p.extraLabel && (
                                <>
                                    <p className="pricing-extra-label">{p.extraLabel}</p>
                                    <ul className="pricing-features">
                                        {p.extraFeatures.map((f, j) => (
                                            <li key={j}>
                                                <span className="feature-check">✓</span>
                                                <span>{f.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
