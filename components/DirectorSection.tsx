
import React from 'react';
import Button from './Button';

interface DirectorSectionProps {
  onOpenModal: (type: string) => void;
}

const DirectorSection: React.FC<DirectorSectionProps> = ({ onOpenModal }) => {
  const careers = [
    {
      title: 'K-LEAGUE CAREER',
      items: ['대전 시티즌 / 울산 현대 / 강원 FC / 부천 FC 1995 / 전남 드래곤즈']
    },
    {
      title: 'GLOBAL EXPERIENCE',
      items: ['영국 포츠머스 FC (Portsmouth FC) 입단']
    },
    {
      title: 'AWARDS',
      items: ["제21회 차범근 축구대상 '대상' 수상", 'FA컵 우승 2회 (울산 현대, 전남 드래곤즈)', '2014 K리그 챌린지 우승']
    },
    {
      title: 'NATIONAL TEAM',
      items: ['U-14 ~ U-23 대한민국 연령별 국가대표', '(전 연령별 대표팀 엘리트 코스)']
    }
  ];

  return (
    <section id="director" className="py-24 md:py-32 bg-dark-bg text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <span className="text-gold font-oswald tracking-[4px] uppercase text-sm mb-4 block">Director / Head Coach</span>
        <h2 className="text-5xl md:text-7xl font-oswald font-bold mb-2 uppercase">Seo Myeong Won</h2>
        <h3 className="text-xl text-gray-500 font-light mb-12">서 명 원 대표</h3>

        <p className="text-xl md:text-2xl text-gray-200 italic font-light mb-16 leading-relaxed px-4">
          "재능은 발견하는 것이 아니라 만들어가는 것입니다.<br />
          프로 무대에서 경험한 모든 노하우를 후배 선수들에게 전합니다."
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left border-t border-[#222] pt-12">
          {careers.map((career, idx) => (
            <div key={idx}>
              <strong className="block text-gold font-oswald text-base tracking-wider mb-2 uppercase">{career.title}</strong>
              <div className="flex flex-col gap-1">
                {career.items.map((item, i) => (
                  <span key={i} className="text-gray-400 text-sm md:text-base leading-snug">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Button onClick={() => onOpenModal('대표 직강 문의')}>Director Lesson (직강 문의)</Button>
        </div>
      </div>
    </section>
  );
};

export default DirectorSection;
