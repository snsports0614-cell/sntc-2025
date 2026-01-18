
import React from 'react';

interface StickyMobileNavProps {
  onOpenModal: (type: string) => void;
}

const StickyMobileNav: React.FC<StickyMobileNavProps> = ({ onOpenModal }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-[1000] bg-black/80 backdrop-blur-xl border-t border-gold/20 flex items-center justify-around py-3 px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <a href="tel:010-8103-8640" className="flex flex-col items-center gap-1 group">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-active:bg-gold transition-colors">
          <i className="fas fa-phone text-gold group-active:text-black"></i>
        </div>
        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Call</span>
      </a>
      
      <a href="#location" className="flex flex-col items-center gap-1 group">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-active:bg-gold transition-colors">
          <i className="fas fa-map-marker-alt text-gold group-active:text-black"></i>
        </div>
        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Location</span>
      </a>

      <button onClick={() => onOpenModal('레슨 상담')} className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 -mt-6 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg shadow-gold/20 active:scale-90 transition-transform">
          <i className="fas fa-calendar-check text-black text-xl"></i>
        </div>
        <span className="text-[10px] text-gold font-bold uppercase tracking-tighter">Inquiry</span>
      </button>

      <a href="https://www.instagram.com/sn.total.training/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 group">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-active:bg-gold transition-colors">
          <i className="fab fa-instagram text-gold group-active:text-black"></i>
        </div>
        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">SNS</span>
      </a>

      <a href="#programs" className="flex flex-col items-center gap-1 group">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-active:bg-gold transition-colors">
          <i className="fas fa-layer-group text-gold group-active:text-black"></i>
        </div>
        <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Menu</span>
      </a>
    </div>
  );
};

export default StickyMobileNav;
