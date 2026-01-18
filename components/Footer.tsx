
import React from 'react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-black py-20 border-t border-[#222]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div>
            <h4 className="text-white font-oswald font-bold text-xl mb-6 uppercase tracking-wider">SN Training Center</h4>
            <div className="text-gray-500 space-y-2 text-sm">
              <p className="flex items-center gap-3"><i className="fas fa-user-tie text-gold w-4"></i> Director: 서명원</p>
              <p className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-gold w-4 mt-1"></i> <span>충남 천안시 서북구 동서대로 129,<br/>단국성정빌딩 10층</span></p>
              <p className="flex items-center gap-3"><i className="fas fa-phone text-gold w-4"></i> Tel: 010-8103-8640</p>
              <p className="flex items-center gap-3"><i className="fas fa-globe text-gold w-4"></i> www.sntc-2025.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-oswald font-bold text-xl mb-6 uppercase tracking-wider">System</h4>
            <ul className="text-gray-500 space-y-3 text-sm">
              <li><a href="#system" className="hover:text-gold transition-colors">SN YOUTH (유소년)</a></li>
              <li><a href="#system" className="hover:text-gold transition-colors">SN FC (고등/성인)</a></li>
              <li><a href="#programs" className="hover:text-gold transition-colors">ELITE LESSON (엘리트 레슨)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-oswald font-bold text-xl mb-6 uppercase tracking-wider">Official Channels</h4>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/sn.total.training/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gold transition-all" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@sn.total.training" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gold transition-all" title="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-[#111] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-700 text-[10px] tracking-widest uppercase">
            &copy; {new Date().getFullYear()} SN Physical Training Center. All Rights Reserved.
          </div>
          <button 
            onClick={onAdminClick}
            className="text-[#333] hover:text-gold/40 text-[10px] transition-colors uppercase tracking-[2px] cursor-pointer flex items-center gap-2"
          >
            <i className="fas fa-lock text-[8px]"></i> Manager Login
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
