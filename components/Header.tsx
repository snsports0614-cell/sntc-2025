
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenModal: (type: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-[1000] py-4 transition-all duration-400 ${isScrolled ? 'scrolled-header shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* 로고 영역 */}
        <a href="#" className="flex items-center gap-4 group">
          <div className="h-12 w-12 bg-gold-gradient rounded-full flex items-center justify-center font-bold text-black font-oswald text-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500">SN</div>
          <div className="flex flex-col">
            <span className="font-oswald text-lg md:text-xl font-bold text-white leading-tight tracking-wide group-hover:text-gold transition-colors uppercase">SN TRAINING CENTER</span>
            <span className="font-oswald text-[10px] md:text-xs text-gold font-normal tracking-[2px] mt-1 uppercase">Professional Football Lab</span>
          </div>
        </a>

        {/* 우측 소셜 링크 (심플하게 인스타그램만 유지) */}
        <div className="flex items-center">
          <a 
            href="https://www.instagram.com/sn.total.training/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl md:text-2xl text-white/80 hover:text-gold transition-all duration-300 transform hover:scale-110"
            title="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
