import React from "react";
import "../App.css"
const Footer = () => {
    return (
        <footer className=" sticky-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="/AdminDashboard">Home</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <ul className="contact-info">
                        <li>Email: Bochrabenromdhane@example.com</li>
                        <li>Phone: (216) 51-71-48-88</li>
                        <li>Address: 27 tunis, tunis</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 Your Buy&&Sell. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer