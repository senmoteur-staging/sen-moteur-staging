import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="/" className="navbar-logo">
                    {/* Placeholder for actual logo usage if image fails */}
                    <div className="logo-placeholder"></div>
                    <span>Sen Moteur</span>
                </a>

                <nav className="navbar-links">
                    <a href="#inventory" className="nav-link">Inventory</a>
                    <a href="#vin-decoder" className="nav-link">VIN Decoder</a>
                    <a href="#warranty" className="nav-link">Warranty</a>
                    <a href="#about" className="nav-link">About Us</a>
                </nav>

                <div className="navbar-actions">
                    <a href="#contact" className="btn btn-primary">Contact Us</a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
