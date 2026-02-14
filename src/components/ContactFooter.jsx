import React from 'react';
import './ContactFooter.css';

const ContactFooter = () => {
    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">Sen Moteur</div>
                        <p className="footer-tagline">Buy smart, Sell easy.</p>
                        <p className="footer-desc">
                            Your trusted partner for sourcing high-quality Korean vehicles
                            and parts for the Senegalese market.
                        </p>
                    </div>

                    <div className="footer-contact">
                        <h3 className="footer-title">Contact Us</h3>
                        <p className="contact-intro">Transforming how you buy cars. Chat with us directly.</p>

                        <div className="contact-grid">
                            <a href="https://wa.me/221788979156" className="contact-card senegal" target="_blank" rel="noopener noreferrer">
                                <span className="office-label">🇸🇳 Dakar Office</span>
                                <span className="phone-number">+221 78 897 9156</span>
                                <span className="cta-text">Chat on WhatsApp &rarr;</span>
                            </a>

                            <a href="https://wa.me/821083848538" className="contact-card korea" target="_blank" rel="noopener noreferrer">
                                <span className="office-label">🇰🇷 Seongnam Office</span>
                                <span className="phone-number">+82 10 8384 8538</span>
                                <span className="cta-text">Chat on WhatsApp &rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Sen Moteur. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;
