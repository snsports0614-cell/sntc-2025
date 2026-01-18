
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import SystemSection from './components/SystemSection';
import SessionsSection from './components/SessionsSection';
import Testimonials from './components/Testimonials';
import DirectorSection from './components/DirectorSection';
import FAQSection from './components/FAQSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import Button from './components/Button';
import InquiryModal from './components/InquiryModal';
import ContactFAB from './components/ContactFAB';
import StickyMobileNav from './components/StickyMobileNav';
import { InquiryRecord, InquiryType } from './types';

const App: React.FC = () => {
  const [modalState, setModalState] = useState({ isOpen: false, type: '' });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const adminSectionRef = useRef<HTMLDivElement>(null);

  const loadInquiries = () => {
    const saved = JSON.parse(localStorage.getItem('sn_inquiries') || '[]');
    setInquiries(saved);
  };

  useEffect(() => {
    loadInquiries();
    window.addEventListener('inquiryUpdated', loadInquiries);
    return () => window.removeEventListener('inquiryUpdated', loadInquiries);
  }, []);

  const openModal = (type: string) => setModalState({ isOpen: true, type });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });
  
  const deleteInquiry = (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const updated = inquiries.filter(inv => inv.id !== id);
    localStorage.setItem('sn_inquiries', JSON.stringify(updated));
    setInquiries(updated);
  };

  const handleAdminAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (adminPassword === '1102') {
      setIsAdminMode(true);
      setIsAuthModalOpen(false);
      setAdminPassword('');
      setTimeout(() => {
        adminSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
      setAdminPassword('');
    }
  };

  return (
    <div className="font-sans antialiased bg-dark-bg text-white overflow-x-hidden selection:bg-gold selection:text-black pb-20 md:pb-0">
      <Header onOpenModal={openModal} />
      
      <main>
        <Hero onOpenModal={openModal} />
        <StatsBar />
        <SystemSection />
        <SessionsSection onOpenModal={openModal} />
        <Testimonials />
        <DirectorSection onOpenModal={openModal} />
        <FAQSection />
        <LocationSection />

        <section id="contact" className="py-24 md:py-40 bg-fixed bg-cover bg-center text-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="container mx-auto px-6">
            <span className="text-gold font-oswald tracking-[5px] uppercase text-sm mb-6 block">Ready to start?</span>
            <h2 className="text-6xl md:text-8xl font-oswald font-bold mb-10 uppercase tracking-tighter leading-none">Join the <span className="text-gold">Pro Team</span></h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
              <Button onClick={() => openModal('레슨 상담')} className="btn-glow text-lg">Consultation (상담 예약)</Button>
              <Button variant="outline" onClick={() => openModal('SN FC 입단 문의')} className="btn-glow text-lg">SN FC Admission</Button>
            </div>
          </div>
        </section>

        <div ref={adminSectionRef}>
          {isAdminMode && (
            <section className="py-24 bg-[#050505] border-t-4 border-gold">
              <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                  <h2 className="text-4xl font-oswald font-bold text-gold uppercase tracking-tight">Inquiry Dashboard</h2>
                  <Button onClick={() => setIsAdminMode(false)} variant="outline" className="text-xs py-2 px-6">Logout</Button>
                </div>
                
                {inquiries.length === 0 ? (
                  <div className="text-center py-32 text-gray-700 border border-dashed border-gray-900 rounded-lg">
                    접수된 문의 내역이 없습니다.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {inquiries.map((inv) => (
                      <div key={inv.id} className="p-6 bg-[#0d0d0d] border border-gray-800 rounded-sm hover:border-gold/50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-xs text-gray-500 font-mono block mb-1">{inv.date}</span>
                            <h3 className="text-xl font-bold text-white">{inv.name} ({inv.phone})</h3>
                            <span className="inline-block bg-gold/10 text-gold text-[10px] px-2 py-0.5 mt-2 font-bold uppercase tracking-widest">{inv.type}</span>
                          </div>
                          <button onClick={() => deleteInquiry(inv.id)} className="text-gray-700 hover:text-red-500 transition-colors">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                        <p className="text-gray-400 text-sm whitespace-pre-wrap bg-black/40 p-4 rounded">{inv.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer onAdminClick={() => setIsAuthModalOpen(true)} />
      <ContactFAB />
      <StickyMobileNav onOpenModal={openModal} />

      <InquiryModal isOpen={modalState.isOpen} onClose={closeModal} initialType={modalState.type} />

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
          <div className="relative bg-black border border-gold/30 p-8 w-full max-w-md">
            <h3 className="text-2xl font-oswald font-bold text-gold text-center mb-8 uppercase tracking-widest">Admin Access</h3>
            <form onSubmit={handleAdminAuth} className="space-y-6">
              <input 
                type="password" 
                placeholder="PASSWORD" 
                className="w-full bg-[#111] border border-white/10 p-4 text-center text-white focus:outline-none focus:border-gold"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
            <button className="mt-6 w-full text-xs text-gray-600 hover:text-white" onClick={() => setIsAuthModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
