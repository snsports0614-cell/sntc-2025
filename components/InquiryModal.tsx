
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { InquiryType, InquiryRecord } from '../types';
import { GoogleGenAI } from "@google/genai";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: string;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, initialType }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'ai'>('form');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: initialType || InquiryType.LESSON,
    message: ''
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setAiResponse('');
      setAiPrompt('');
      let mappedType = initialType;
      if (initialType === 'BALL LESSON' || initialType === 'PHYSICAL' || initialType === 'RECOVERY') {
        mappedType = InquiryType.LESSON;
      }
      setFormData(prev => ({ ...prev, type: mappedType || InquiryType.LESSON }));
    }
  }, [isOpen, initialType]);

  const saveInquiry = (record: Omit<InquiryRecord, 'id' | 'date'>) => {
    const existing = JSON.parse(localStorage.getItem('sn_inquiries') || '[]');
    const newRecord: InquiryRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toLocaleString('ko-KR')
    };
    localStorage.setItem('sn_inquiries', JSON.stringify([newRecord, ...existing]));
    window.dispatchEvent(new Event('inquiryUpdated'));
  };

  const handleAiConsult = async () => {
    if (!aiPrompt.trim()) return;

    // API 키 확인 및 선택 유도
    if (typeof (window as any).aistudio !== 'undefined') {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }

    setIsAiLoading(true);
    setAiResponse('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `당신은 대한민국 최고의 엘리트 축구 센터 'SN 트레이닝 센터'의 전문 수석 코치입니다. 서명원 대표(전 국가대표)의 철학을 담아 답변하세요. 사용자의 상태: "${aiPrompt}". 위 내용을 바탕으로 BALL LESSON(기술), PHYSICAL(피지컬), RECOVERY(부상방지) 중 가장 필요한 세션을 추천하고 이유를 설명하세요. 신뢰감 있고 전문적인 어조로 한국어 3~4문장으로 답변하세요.`,
      });
      
      const text = response.text;
      if (text) {
        setAiResponse(text);
        saveInquiry({
          name: 'AI 상담 사용자',
          phone: '-',
          type: 'AI 추천 상담',
          message: `질문: ${aiPrompt}\n답변: ${text}`,
          isAiRecommendation: true
        });
      }
    } catch (error: any) {
      if (error.message?.includes("entity was not found")) {
        if (typeof (window as any).aistudio !== 'undefined') {
          await (window as any).aistudio.openSelectKey();
        }
      }
      setAiResponse("상담 기능을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주시거나 'Direct Inquiry'를 이용해 주세요.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveInquiry({
      name: formData.name,
      phone: formData.phone,
      type: formData.type,
      message: formData.message
    });
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  // Improved Input Classes: Increased padding (p-5), stronger focus borders, and clearer ring
  const inputClasses = "w-full bg-black border border-[#333] p-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 rounded-sm appearance-none";

  if (!isOpen) return null;

  const sessionDetail = (() => {
    switch (initialType) {
      case 'BALL LESSON': return { title: "BALL LESSON CURRICULUM", items: ["1:1 돌파 및 탈압박 기술", "포지션별 특화 슈팅 및 크로스", "실전 지향적 퍼스트 터치 디테일"] };
      case 'PHYSICAL': return { title: "PHYSICAL PROGRAM", items: ["축구 특화 폭발적 스피드 강화", "코어 안정성 및 밸런스 트레이닝", "데이터 기반 파워 측정 및 개선"] };
      case 'RECOVERY': return { title: "RECOVERY & CARE", items: ["고강도 훈련 후 근막 이완 케어", "맞춤형 동적 스트레칭 가이드", "부상 방지 컨디셔닝 체크"] };
      default: return null;
    }
  })();

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0d0d0d] w-full max-w-xl border border-[#222] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] my-8">
        <button className="absolute top-6 right-8 text-white/50 text-4xl hover:text-gold z-10" onClick={onClose}>&times;</button>

        {!isSubmitted ? (
          <>
            <div className="flex border-b border-[#222] mb-10">
              <button className={`flex-1 py-4 font-oswald text-sm tracking-widest uppercase transition-all ${activeTab === 'form' ? 'text-gold border-b-2 border-gold' : 'text-gray-600'}`} onClick={() => setActiveTab('form')}>Direct Inquiry</button>
              <button className={`flex-1 py-4 font-oswald text-sm tracking-widest uppercase transition-all ${activeTab === 'ai' ? 'text-gold border-b-2 border-gold' : 'text-gray-600'}`} onClick={() => setActiveTab('ai')}>AI Path Advisor</button>
            </div>

            {activeTab === 'form' && sessionDetail && (
              <div className="mb-10 p-6 bg-gold/5 border border-gold/20 rounded-sm">
                <h4 className="font-oswald text-gold text-xs tracking-[2px] mb-4 uppercase font-bold">{sessionDetail.title}</h4>
                <ul className="space-y-2">
                  {sessionDetail.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-300">
                      <i className="fas fa-check text-gold mr-3 text-[10px]"></i>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                  <input type="text" placeholder="선수 이름 (Name)" className={inputClasses} required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <input type="tel" placeholder="연락처 (Phone)" className={inputClasses} required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="space-y-1 relative">
                  <select className={inputClasses} value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value as InquiryType})}>
                    {Object.values(InquiryType).map(type => <option key={type} value={type} className="bg-black">{type}</option>)}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gold/50">
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>
                <div className="space-y-1">
                  <textarea rows={4} placeholder="궁금하신 내용을 입력해주세요" className={`${inputClasses} resize-none`} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                </div>
                <Button type="submit" className="w-full btn-glow h-16">Submit Inquiry</Button>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="text-center mb-4">
                  <p className="text-gray-500 text-sm">현재 고민이나 훈련 목표를 입력하시면<br/>Gemini AI가 최적의 코스를 추천해 드립니다.</p>
                </div>
                <textarea rows={5} placeholder="예: 중학교 3학년 윙어입니다. 실전에서 1:1 돌파 성공률을 높이고 싶어요." className={inputClasses} value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
                <Button onClick={handleAiConsult} disabled={isAiLoading || !aiPrompt.trim()} className="w-full btn-glow h-16">
                  {isAiLoading ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : null}
                  {isAiLoading ? 'Analyzing...' : 'Get AI Recommendation'}
                </Button>
                {aiResponse && (
                  <div className="mt-8 p-6 bg-black border border-gold/30 rounded-sm text-sm text-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gold-gradient"></div>
                    <div className="text-gold font-oswald text-[10px] tracking-widest uppercase mb-3 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span>
                      Professional Advice
                    </div>
                    <div className="leading-relaxed whitespace-pre-line">
                      {aiResponse}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold/20">
              <i className="fas fa-check text-black text-4xl"></i>
            </div>
            <h3 className="text-3xl font-oswald font-bold mb-4 uppercase">Inquiry Received</h3>
            <p className="text-gray-400 mb-10 leading-relaxed">성공적으로 접수되었습니다.<br/>최대한 빠르게 연락드리겠습니다.</p>
            <Button onClick={onClose} variant="outline" className="px-12">Close</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
