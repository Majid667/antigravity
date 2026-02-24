import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            text: "The only AI tool that I've found helpful so far is OpusClip. It can do something that I don't have time to do. I'm a super fan.",
            author: "Jason Lemkin",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jason"
        },
        {
            text: "Opusclip has been crucial in helping me upload more short form videos. I get to throw more things at the wall to see what sticks.",
            author: "Jacksfilms",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack"
        },
        {
            text: "We love YT shorts' massive reach but hate its revenue - that's why we use OpusClip to bring the cost down.",
            author: "WildBrain",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wild"
        },
        {
            text: "It used to take days to create clips. Now it takes us minutes to create them.",
            author: "Lewis Howes",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lewis"
        }
    ];

    return (
        <section className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2>Trusted by creators everywhere</h2>
                </div>
                <div className="testimonial-track">
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="testimonial-card">
                            <p className="quote">"{t.text}"</p>
                            <div className="testimonial-author">
                                <img src={t.avatar} alt={t.author} className="avatar" />
                                <span>{t.author}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
