import React, { useState } from 'react';
import './VINDecoder.css';

const VINDecoder = () => {
    const [vin, setVin] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (vin.length < 5) return;

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch('/api/vin-decode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vin }),
            });

            if (!response.ok) {
                const errData = await response.text();
                let errMsg = 'Failed to decode VIN';
                try {
                    const jsonErr = JSON.parse(errData);
                    errMsg = jsonErr.error || errMsg;
                } catch (e) { /* ignore json parse error */ }
                throw new Error(errMsg);
            }

            const data = await response.json();

            // Map the API response to our UI state
            setResult({
                make: data.make,
                model: data.model,
                year: data.year,
                engine: data.engine || 'N/A',
                transmission: data.transmission || 'N/A',
                origin: data.manufacturer || 'Unknown',
                status: 'Verified',
                // We keep extras/raw in data if needed for later
            });

        } catch (err) {
            setError(err.message || "Failed to decode VIN. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="vin-decoder" className="vin-section">
            <div className="container">
                <div className="vin-header text-center">
                    <h2 className="section-title">Free VIN Decoder</h2>
                    <p className="section-subtitle">
                        Verify vehicle specifications instantly. Optimized for Korean & European models.
                    </p>
                </div>

                <div className="vin-card">
                    <form onSubmit={handleSearch} className="vin-form">
                        <input
                            type="text"
                            placeholder="Enter Vehicle Identification Number (VIN)"
                            value={vin}
                            onChange={(e) => setVin(e.target.value.toUpperCase())}
                            className="vin-input"
                        />
                        <button type="submit" className="btn btn-primary btn-icon" disabled={loading}>
                            {loading ? 'Analyzing...' : 'Decode VIN'}
                        </button>
                    </form>

                    {error && (
                        <div className="vin-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {result && (
                        <div className="vin-result">
                            <div className="result-header">
                                <h3>Vehicle Specifications</h3>
                                <span className="badge-verified">✓ Verified by Sen Moteur</span>
                            </div>
                            <div className="result-grid">
                                <div className="result-item">
                                    <span className="label">Make</span>
                                    <span className="value">{result.make}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Model</span>
                                    <span className="value">{result.model}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Year</span>
                                    <span className="value">{result.year}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Engine</span>
                                    <span className="value">{result.engine}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Transmission</span>
                                    <span className="value">{result.transmission}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Origin</span>
                                    <span className="value">{result.origin}</span>
                                </div>
                            </div>
                            <div className="result-footer">
                                <p>Interested in this type of vehicle?</p>
                                <a href="#contact" className="link-action">Request Sourcing Quote &rarr;</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section >
    );
};

export default VINDecoder;
