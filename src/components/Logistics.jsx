import React from 'react';
import './Logistics.css';

const Logistics = () => {
    return (
        <section id="logistics" className="logistics-section">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title">Global Logistics & Sourcing</h2>
                    <p className="section-subtitle">From Seongnam to Dakar, we handle the entire process.</p>
                </div>

                <div className="logistics-map">
                    <div className="route-visual">
                        <div className="point korea">
                            <span className="point-label">KR</span>
                            <span className="city-name">Seongnam</span>
                        </div>
                        <div className="route-line">
                            <span className="ship-icon">🚢</span>
                        </div>
                        <div className="point senegal">
                            <span className="point-label">SN</span>
                            <span className="city-name">Dakar</span>
                        </div>
                    </div>
                </div>

                <div className="logistics-features">
                    <div className="feature-item">
                        <h3>Parts Sourcing</h3>
                        <p>Need a specific part? We source original components directly from manufacturers.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Custom Orders</h3>
                        <p>Tell us what you want. We find the exact model, color, and year.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Secure Shipping</h3>
                        <p>Insured global shipping with real-time tracking updates.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Logistics;
