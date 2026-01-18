
import React, { useState } from 'react';

const faqs = [
  {
    question: "레슨 대상은 어떻게 되나요?",
    answer: "초등 유소년부터 중·고등 엘리트 선수, 그리고 프로 지망 성인 선수까지 수준별로 진행됩니다. 입문자를 위한 SN 유스반도 별도로 운영 중입니다."
  },
  {
    question: "1:1 레슨과 그룹 레슨의 차이는 무엇인가요?",
    answer: "1:1 레슨은 개인의 장단점을 정밀 분석하여 디테일한 기술 교정에 집중하며, 그룹 레슨은 실전 상황에서의 전술적 움직임과 1:1 대응 능력을 키우는 데 효과적입니다."
  },
  {
    question: "준비물은 무엇인가요?",
    answer: "개인 축구화(풋살화 추천), 운동복, 그리고 마실 물을 준비해 주시면 됩니다. 훈련 장비는 센터에서 모두 제공합니다."
  },
  {
    question: "서명원 대표님이 직접 지도하시나요?",
    answer: "네, 대표 직강 세션이 별도로 마련되어 있으며 엘리트 코스의 경우 서명원 대표님이 직접 프로그램 설계와 핵심 기술 지도를 총괄합니다."
  }
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#080808]">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-4 uppercase">
            FAQ<span className="text-gold">S</span>
          </h2>
          <p className="text-gray-500">궁금해하시는 질문들을 정리했습니다.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-sm overflow-hidden">
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left bg-dark-card hover:bg-[#181818] transition-colors"
              >
                <span className="font-bold text-gray-200">{faq.question}</span>
                <i className={`fas fa-chevron-down text-gold text-xs transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`}></i>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === idx ? 'max-h-40 border-t border-white/5' : 'max-h-0'}`}
              >
                <p className="p-6 text-gray-400 text-sm leading-relaxed bg-black/50">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
