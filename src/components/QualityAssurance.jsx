import React from 'react';
import './QualityAssurance.css';

const QualityAssurance = () => {
    return (
        <section id="qa" className="qa-section">
            <div className="container">
                <div className="qa-content">
                    <div className="qa-text">
                        <h2 className="section-title">The Diagnostic Guarantee</h2>
                        <p className="section-subtitle">
                            We don't just sell cars; we certify them. Every vehicle undergoes a rigorous
                            multi-point inspection before it leaves Korea.
                        </p>

                        <ul className="qa-list">
                            <li>
                                <div className="qa-icon">🔧</div>
                                <div>
                                    <h4>120-Point Inspection</h4>
                                    <p>Engine, transmission, suspension, and electronics verified.</p>
                                </div>
                            </li>
                            <li>
                                <div className="qa-icon">📹</div>
                                <div>
                                    <h4>Video Verification</h4>
                                    <p>Receive a personal walkthrough video of your specific car.</p>
                                </div>
                            </li>
                            <li>
                                <div className="qa-icon">🛡️</div>
                                <div>
                                    <h4>Genchi Gembutsu</h4>
                                    <p>Our team is physically on-site in Seongnam to inspect.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="qa-media">
                        <div className="video-placeholder">
                            <div className="play-button">▶</div>
                            <p>Watch our Inspection Process</p>
                        </div>
                        <div className="trust-badge">
                            <span>Officially Licensed</span>
                            <strong>Exporter</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityAssurance;
