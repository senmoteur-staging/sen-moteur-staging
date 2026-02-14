import React from 'react';
import './WarrantySection.css';

const WarrantySection = () => {
    return (
        <section id="warranty" className="warranty-section">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title">Transparent Warranty Program</h2>
                    <p className="section-subtitle">We stand behind every car we sell with our Tiered Warranty Coverage.</p>
                </div>

                <div className="warranty-grid">
                    <div className="warranty-card">
                        <div className="card-header">
                            <span className="plan-name">Standard</span>
                            <h3 className="plan-duration">3 Months</h3>
                        </div>
                        <div className="card-body">
                            <p className="plan-desc">For older reliable models (2010-2014)</p>
                            <ul className="plan-features">
                                <li>Engine Block Coverage</li>
                                <li>Transmission Basics</li>
                                <li>Standard Support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="warranty-card featured">
                        <div className="card-tag">Most Popular</div>
                        <div className="card-header">
                            <span className="plan-name">Extended</span>
                            <h3 className="plan-duration">6 Months</h3>
                        </div>
                        <div className="card-body">
                            <p className="plan-desc">For mid-range vehicles (2015-2018)</p>
                            <ul className="plan-features">
                                <li>Engine & Transmission</li>
                                <li>Electrical Systems (Basic)</li>
                                <li>Priority Support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="warranty-card">
                        <div className="card-header">
                            <span className="plan-name">Premium</span>
                            <h3 className="plan-duration">12 Months</h3>
                        </div>
                        <div className="card-body">
                            <p className="plan-desc">For late-model vehicles (2019+)</p>
                            <ul className="plan-features">
                                <li>Full Powertrain Coverage</li>
                                <li>Advanced Electronics</li>
                                <li>24/7 Logistics Support</li>
                                <li>Free Oil Change Kit</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WarrantySection;
