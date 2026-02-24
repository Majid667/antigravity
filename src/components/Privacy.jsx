import React from 'react';

const Privacy = () => {
    return (
        <section className="legal-page">
            <div className="container legal-container">
                <h1>Privacy Policy</h1>
                <p className="legal-date">Last updated: February 23, 2026</p>

                <div className="legal-section">
                    <h2>Introduction</h2>
                    <p>Opus Technologies, Inc. ("OpusClip," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and share information when you use the OpusClip platform and services (the "Services").</p>
                    <p>By using our Services, you agree to the collection and use of information in accordance with this policy.</p>
                </div>

                <div className="legal-section">
                    <h2>Information We Collect</h2>
                    <h3>Information You Provide</h3>
                    <ul>
                        <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
                        <li><strong>Payment Information:</strong> When you purchase a subscription, we collect billing information such as your credit card number and billing address. Payment processing is handled by third-party payment processors.</li>
                        <li><strong>Content:</strong> We collect the videos, images, and other content you upload to the Services for processing.</li>
                        <li><strong>Communications:</strong> If you contact us, we collect the information you provide in your communication.</li>
                    </ul>
                    <h3>Information Collected Automatically</h3>
                    <ul>
                        <li><strong>Usage Data:</strong> We collect information about how you interact with the Services, including pages visited, features used, and the time and duration of your activities.</li>
                        <li><strong>Device Information:</strong> We collect information about the device you use to access the Services, including your IP address, browser type, operating system, and device identifiers.</li>
                        <li><strong>Cookies and Similar Technologies:</strong> We use cookies, pixels, and similar tracking technologies to collect information about your browsing activities and to personalize your experience.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>How We Use Your Information</h2>
                    <p>We use the information we collect for the following purposes:</p>
                    <ul>
                        <li><strong>Provide and Improve Services:</strong> To operate, maintain, and improve the Services, including AI-powered video processing, clipping, captioning, and reframing.</li>
                        <li><strong>Personalization:</strong> To personalize your experience and deliver content and features that match your interests.</li>
                        <li><strong>Communication:</strong> To send you service-related notices, updates, security alerts, and support messages.</li>
                        <li><strong>Analytics:</strong> To understand usage patterns and improve the functionality and performance of our Services.</li>
                        <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, and security issues.</li>
                        <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>How We Share Your Information</h2>
                    <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> We share information with third-party vendors who help us operate the Services, such as cloud hosting, payment processing, and analytics.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
                        <li><strong>With Your Consent:</strong> We may share your information for other purposes with your explicit consent.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>Data Retention</h2>
                    <p>We retain your personal information for as long as your account is active or as needed to provide you the Services. We may also retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.</p>
                    <p>Uploaded video content is retained only for the duration necessary to process and generate clips. You may delete your content at any time through your account settings.</p>
                </div>

                <div className="legal-section">
                    <h2>Data Security</h2>
                    <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                </div>

                <div className="legal-section">
                    <h2>Your Rights and Choices</h2>
                    <p>Depending on your jurisdiction, you may have the following rights:</p>
                    <ul>
                        <li><strong>Access and Portability:</strong> You can request a copy of your personal data.</li>
                        <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
                        <li><strong>Deletion:</strong> You can request that we delete your personal information.</li>
                        <li><strong>Opt-Out:</strong> You can opt out of marketing communications at any time by clicking the "unsubscribe" link in our emails.</li>
                        <li><strong>Cookie Preferences:</strong> You can manage cookies through your browser settings.</li>
                    </ul>
                    <p>To exercise these rights, please contact us at <a href="mailto:privacy@opus.pro">privacy@opus.pro</a>.</p>
                </div>

                <div className="legal-section">
                    <h2>Children's Privacy</h2>
                    <p>The Services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>
                </div>

                <div className="legal-section">
                    <h2>International Data Transfers</h2>
                    <p>Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy.</p>
                </div>

                <div className="legal-section">
                    <h2>Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
                </div>

                <div className="legal-section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul>
                        <li>Email: <a href="mailto:privacy@opus.pro">privacy@opus.pro</a></li>
                        <li>Address: Opus Technologies, Inc., San Francisco, CA, United States</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Privacy;
