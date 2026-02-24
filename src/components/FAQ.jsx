import React, { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={onClick}>
            <div className="faq-question">
                <h3>{question}</h3>
                <span className="faq-icon">{isOpen ? '▲' : '▼'}</span>
            </div>
            <div className="faq-answer">
                <div className="faq-answer-content">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How does OpusClip work?",
            answer: "OpusClip leverages big data to analyze your video content in relation to the latest social and marketing trends from major platforms, and generates a comprehensive understanding of your video for a data-driven decision on content repurposing. It then picks the highlighting moments of your long video, rearranges them into a viral-worthy short and polishes it with dynamic captions, AI-relayout, smooth transition to ensure that the clip is coherent and attention-grabbing, and ends with a strong call-to-action."
        },
        {
            question: "What types of videos can I upload?",
            answer: "You can use OpusClip to clip any video type that you have with our newest model ClipAnything. Whether it's talking-head videos like podcasts and interviews, vlogs, sports, TV shows, or videos with little to no dialogue, ClipAnything understands all the visual, audio and sentiment cues throughout the video, and can clip the best moments from your video. You can also use natural language prompts to clip a specific moment."
        },
        {
            question: "Which languages are supported?",
            answer: "We support English, German, Spanish, French, Portuguese, Italian, Dutch, Russian, Polish, Indonesian, Ukrainian, Swedish, Turkish, Norwegian, Croatian, Romanian, Slovak, Greek, Danish, Finnish, Hungarian, Czech, Japanese, Korean, Vietnamese and more to come."
        },
        {
            question: "Can I add captions?",
            answer: "Absolutely! In fact, OpusClip automatically adds captions for you with over 97% accuracy! You can change text and edit it freely."
        },
        {
            question: "Is OpusClip free to use?",
            answer: "OpusClip is free to use. If you are a new user, you will enjoy a 3-day free trial of our Pro Plan, which gives you 90 minutes of video processing time (~30 downloadable clips). Once your free trial ends, you can either upgrade to paid subscription, or use our free-forever plan with 60 minutes of video processing time refreshed monthly."
        },
        {
            question: "I have more questions!",
            answer: <>Please join our <a href="#">Discord</a> or email us at <a href="mailto:contact@opus.pro">contact@opus.pro</a> if you need help or have any questions or advice for us.</>
        }
    ];

    return (
        <section className="faq">
            <div className="container">
                <h2 className="section-title">Got questions?</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
