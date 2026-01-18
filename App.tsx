
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

  const clearAllInquiries = () => {
    if (!confirm('모든 문의 내역을 초기화하시겠습니까?')) return;
    localStorage.removeItem('sn_inquiries');
    setInquiries([]);
  };

  // 통계 계산
  const stats = {
    total: inquiries.length,
    lesson: inquiries.filter(i => i.type === InquiryType.LESSON).length,
    fc: inquiries.filter(i => i.type === InquiryType.FC_TEST).length,
    ai: inquiries.filter(i => i.isAiRecommendation).length
  };

  return (
    <div className="font-sans antialiased bg-dark-bg text-white overflow-x-hidden selection:bg-gold selection:text-black">
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
            <section className="py-24 bg-[#050505] border-t-4 border-gold animate-in slide-in-from-bottom-10 duration-700">
              <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                  <div>
                    <h2 className="text-4xl font-oswald font-bold text-gold uppercase tracking-tight">Inquiry Dashboard</h2>
                    <p className="text-gray-500 mt-2">관리자 전용: 접수된 실시간 문의 내역입니다.</p>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={clearAllInquiries} variant="outline" className="text-xs py-2 px-6 border-red-900/30 text-red-500 hover:bg-red-500/10">Clear All</Button>
                    <Button onClick={() => setIsAdminMode(false)} variant="outline" className="text-xs py-2 px-6">Logout</Button>
                  </div>
                </div>

                {/* Dashboard Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="bg-[#111] p-4 border border-white/5 rounded">
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Total</div>
                    <div className="text-2xl font-oswald font-bold text-white">{stats.total}</div>
                  </div>
                  <div className="bg-[#111] p-4 border border-white/5 rounded">
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Lesson</div>
                    <div className="text-2xl font-oswald font-bold text-gold">{stats.lesson}</div>
                  </div>
                  <div className="bg-[#111] p-4 border border-white/5 rounded">
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">FC Test</div>
                    <div className="text-2xl font-oswald font-bold text-gold">{stats.fc}</div>
                  </div>
                  <div className="bg-[#111] p-4 border border-white/5 rounded">
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">AI Consult</div>
                    <div className="text-2xl font-oswald font-bold text-blue-400">{stats.ai}</div>
                  </div>
                </div>
                
                {inquiries.length === 0 ? (
                  <div className="text-center py-32 text-gray-700 border border-dashed border-gray-900 rounded-lg">
                    <i className="fas fa-inbox text-5xl mb-4 block opacity-20"></i>
                    현재 접수된 문의 내역이 없습니다.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {inquiries.map((inv) => (
                      <div key={inv.id} className={`p-6 bg-[#0d0d0d] border ${inv.isAiRecommendation ? 'border-gold/30' : 'border-gray-800'} rounded-sm hover:border-gold/50 transition-colors group relative`}>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs text-gray-500 font-mono">{inv.date}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${inv.isAiRecommendation ? 'bg-gold text-black' : 'bg-gray-800 text-gray-400'}`}>
                                {inv.type}
                              </span>
                            </div>
                            <div className="flex items-baseline gap-4 mb-4">
                              <h3 className="text-xl font-bold text-white">{inv.name}</h3>
                              <span className="text-gold font-oswald tracking-widest">{inv.phone}</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap bg-black/40 p-4 rounded border border-white/5">
                              {inv.message}
                            </p>
                          </div>
                          <div className="flex flex-col justify-between items-end">
                            <button 
                              onClick={() => deleteInquiry(inv.id)} 
                              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                              title="삭제"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
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

      <InquiryModal isOpen={modalState.isOpen} onClose={closeModal} initialType={modalState.type} />

      {/* 관리자 인증 커스텀 모달 */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsAuthModalOpen(false)} />
          <div className="relative bg-black border border-gold/30 p-8 md:p-12 w-full max-w-md shadow-2xl shadow-gold/10">
            <h3 className="text-2xl font-oswald font-bold text-gold text-center mb-8 uppercase tracking-widest">Admin Access</h3>
            <form onSubmit={handleAdminAuth} className="space-y-6">
              <input 
                type="password" 
                placeholder="PASSWORD" 
                className="w-full bg-[#111] border border-white/10 p-4 text-center text-white tracking-[0.5em] focus:outline-none focus:border-gold transition-all"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full">Unlock Dashboard</Button>
            </form>
            <button 
              className="mt-6 w-full text-xs text-gray-600 uppercase tracking-widest hover:text-white transition-colors"
              onClick={() => setIsAuthModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
