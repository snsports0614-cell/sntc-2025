
import React from 'react';
import Button from './Button';

interface HeroProps {
  onOpenModal: (type: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section 
      id="about" 
      className="relative h-screen flex items-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1516731415730-18fb73318f25?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <span className="inline-block border border-gold text-gold px-4 py-2 font-oswald tracking-[2px] text-sm mb-6 bg-black/50 uppercase">
          Professional Football Lab
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-oswald font-bold leading-tight mb-6 uppercase">
          Elite <span className="text-gold">Ball Lesson</span><br />
          & Total Management
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
          서명원 대표의 실전 노하우.<br />
          기술(Skill), 피지컬(Physical), 리커버리(Recovery)를 하나로 통합한<br />
          SN 트레이닝 센터만의 독보적인 훈련 시스템.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => onOpenModal('레슨 상담')}>Consulting (상담 예약)</Button>
          <a href="#system" className="contents">
            <Button variant="outline">View System</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
