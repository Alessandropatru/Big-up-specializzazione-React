import { FaGithub } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                
                <div className="social-links">
                    <a href="https://github.com/Alessandropatru" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/alessandro-pio-patruno-a9a201339/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.instagram.com/_patruu/" target="_blank" rel="noopener noreferrer">
                        <IoLogoInstagram />
                    </a>
                </div>

                
                <div className="info">
                    <p>
                        <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/privacy-policy">Privacy Policy</a>
                    </p>
                </div>

                
                <div className="copyright">
                    <p>&copy; 2025 Alessandro Patruno. All rights reserved.</p>
                </div>

                
                <button className="btn-footer">
                    Subscribe to our Newsletter
                </button>
            </div>
        </footer>
    );
}
