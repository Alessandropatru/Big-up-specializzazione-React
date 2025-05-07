import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                {/* SEZIONE SOCIAL */}
                <div className="social-links">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <IoLogoInstagram />
                    </a>
                </div>

                {/* SEZIONE INFORMAZIONI */}
                <div className="info">
                    <p>
                        <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/privacy-policy">Privacy Policy</a>
                    </p>
                </div>

                {/* SEZIONE COPYRIGHT */}
                <div className="copyright">
                    <p>&copy; 2025 Alessandro Patruno. All rights reserved.</p>
                </div>

                {/* PULSANTE DI ISCRIZIONE */}
                <button className="btn-footer">
                    Subscribe to our Newsletter
                </button>
            </div>
        </footer>
    );
}
