import { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import "../components/css/sidebar.css"; 

export default function BackToTopButton() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handleScroll = () => {
      
        if (window.scrollY > 400) {
            setShowScrollTop(true);
        } else {
            setShowScrollTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showScrollTop && (
                <button
                    className="scroll-to-top"
                    onClick={scrollToTop}
                    title="Torna su"
                >
                    <AiOutlineArrowUp size={24} />
                </button>
            )}
        </>
    );
}
