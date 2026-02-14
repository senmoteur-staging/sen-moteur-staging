import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-gradient-overlay"></div>
            </div>
            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Premier Automotive Sourcing
                    </div>
                    <h1 className="hero-title">
                        The Best Car Seller <br />
                        <span className="highlight">in South Korea</span>
                    </h1>
                    <p className="hero-description">
                        Specializing in Korean vehicle models for the Senegal market.
                        We verify specifications, ensure quality, and handle logistics so you don't have to.
                    </p>
                    <div className="hero-actions">
                        <a href="#inventory" className="btn btn-primary btn-lg">
                            Browse Inventory
                            <svg className="icon-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </a>
                        <a href="#vin-decoder" className="btn btn-secondary btn-lg">Verify VIN</a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">500+</span>
                            <span className="stat-label">Cars Exported</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">100%</span>
                            <span className="stat-label">Inspection Rate</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="car-showcase">
                        {/* Abstract shapes for premium feel if no image */}
                        <div className="visual-circle circle-1"></div>
                        <div className="visual-circle circle-2"></div>
                        <div className="glass-card">
                            <div className="glass-header">
                                <div className="glass-dot red"></div>
                                <div className="glass-dot yellow"></div>
                                <div className="glass-dot green"></div>
                            </div>
                            <div className="glass-content">
                                <div className="skeleton-line title"></div>
                                <div className="skeleton-line subtitle"></div>
                                <div className="skeleton-box"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
