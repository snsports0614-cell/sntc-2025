
import React from 'react';
import { SessionInfo } from '../types';

interface SessionsSectionProps {
  onOpenModal: (type: string) => void;
}

const sessions: SessionInfo[] = [
  {
    id: '01',
    title: 'BALL LESSON',
    description: '실전에서 통하는 기술 훈련. 볼 컨트롤, 드리블, 슈팅, 1:1 돌파 등 경기장 위에서 차이를 만드는 디테일.',
    image: 'https://images.unsplash.com/photo-1552668693-070fd13913b7?q=80&w=2070&auto=format&fit=crop', 
    icon: 'fas fa-futbol'
  },
  {
    id: '02',
    title: 'PHYSICAL',
    description: '데이터 기반의 과학적 측정. 폭발적인 스피드와 파워, 밸런스 등 축구에 필요한 신체 능력을 극대화.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop', 
    icon: 'fas fa-bolt'
  },
  {
    id: '03',
    title: 'RECOVERY',
    description: '부상 예방 및 리커버리. 고강도 훈련 후 근육 이완, 컨디셔닝, 부상 방지 집중 케어 세션.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa8795?q=80&w=2070&auto=format&fit=crop', 
    icon: 'fas fa-heart-pulse'
  }
];

const SessionsSection: React.FC<SessionsSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="programs" className="py-24 md:py-40 bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-oswald font-bold mb-6 uppercase tracking-tight">
              Our <span className="text-gold">Sessions</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl border-l-2 border-gold pl-6 leading-relaxed">
              선수의 퍼포먼스를 완성하는<br />
              3가지 핵심 트레이닝 솔루션
            </p>
          </div>
          <div className="hidden lg:block text-gold/20 font-oswald text-8xl font-bold select-none">
            TRAINING
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10">
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className="relative group p-12 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10 last:border-0 transition-all duration-700 hover:bg-black overflow-hidden h-[500px] flex flex-col justify-end"
            >
              {/* 배경 이미지 레이어 */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 grayscale group-hover:opacity-40 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 z-0"
                style={{ backgroundImage: `url(${session.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-1"></div>

              <div className="absolute top-12 right-12 text-6xl font-oswald font-bold text-white/[0.05] group-hover:text-gold/20 transition-colors duration-500 z-2 pointer-events-none">
                {session.id}
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-8 group-hover:bg-gold-gradient group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                  <i className={`${session.icon} text-3xl text-gold group-hover:text-black transition-colors duration-500`}></i>
                </div>
                
                <h3 className="text-4xl font-oswald font-bold mb-4 uppercase tracking-wide group-hover:text-gold transition-colors duration-500">
                  {session.title}
                </h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-500 max-w-xs">
                  {session.description}
                </p>
                
                <div 
                  className="flex items-center gap-4 group/link cursor-pointer w-fit"
                  onClick={() => onOpenModal(session.title)}
                >
                  <span className="font-oswald text-sm font-bold tracking-widest text-white/50 group-hover:text-gold transition-colors">DISCOVER MORE</span>
                  <div className="w-8 h-[2px] bg-white/20 group-hover:w-16 group-hover:bg-gold transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SessionsSection;
