
import React from 'react';

const ContactFAB: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[500] flex flex-col gap-4 animate-bounce-slow">
      {/* 전화 상담 버튼 */}
      <a 
        href="tel:010-8103-8640"
        className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.5)] hover:scale-110 transition-transform group"
        title="전화 상담"
      >
        <i className="fas fa-phone text-black text-2xl group-hover:rotate-12 transition-transform"></i>
      </a>
      
      {/* 인스타그램 버튼 (옵션) */}
      <a 
        href="https://www.instagram.com/sn.total.training/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all ml-auto"
      >
        <i className="fab fa-instagram text-xl"></i>
      </a>
    </div>
  );
};

export default ContactFAB;
