
import React from 'react';

const SystemSection: React.FC = () => {
  const systems = [
    {
      icon: 'fas fa-seedling',
      title: 'SN YOUTH',
      description: '유소년 전문 육성반.\n기본기 중심의 즐거운 축구와 엘리트 코스 입문.',
      highlight: false
    },
    {
      icon: 'fas fa-trophy',
      title: 'SN LESSON',
      description: '엘리트 선수 퍼포먼스 센터.\n1:1 / 그룹 레슨, 피지컬 트레이닝, 부상 예방.',
      highlight: true
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'SN FC',
      description: '성인/고등 독립구단.\n프로 진출 및 재기를 목표로 하는 선수들의 실전 팀 훈련.',
      highlight: false
    }
  ];

  return (
    <section id="system" className="py-24 md:py-32 bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-4 uppercase">
            SN <span className="text-gold">Football System</span>
          </h2>
          <p className="text-gray-500 text-lg">트레이닝부터 선수 육성, 프로 진출까지 이어지는 원스톱 시스템</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {systems.map((sys, idx) => (
            <div 
              key={idx} 
              className={`p-12 text-center transition-all duration-300 border ${
                sys.highlight 
                  ? 'bg-[#181818] border-gold/40' 
                  : 'bg-dark-card border-[#222]'
              } hover:-translate-y-2 hover:border-gold group`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl border ${
                sys.highlight 
                  ? 'bg-gold-gradient text-black border-none' 
                  : 'text-gold border-gold/30'
              }`}>
                <i className={sys.icon}></i>
              </div>
              <h3 className={`text-2xl font-oswald font-bold mb-4 ${sys.highlight ? 'text-gold' : 'text-white'}`}>
                {sys.title}
              </h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {sys.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemSection;
