
import React from 'react';

const Testimonials: React.FC = () => {
  const data = [
    {
      name: "김민준 선수",
      tag: "U-18 Elite",
      comment: "SN 트레이닝을 통해 볼 터치가 몰라보게 정교해졌습니다. 특히 실전 상황에서의 1:1 대처 능력이 크게 향상되었습니다.",
      change: "+20% Speed Increase"
    },
    {
      name: "이현우 선수",
      tag: "K-League Youth",
      comment: "피지컬 세션이 정말 과학적입니다. 단순 웨이트가 아니라 축구 선수가 써야 하는 근육을 정확히 훈련시켜 줍니다.",
      change: "Elite Performance Level"
    },
    {
      name: "박준영 선수",
      tag: "Academy Player",
      comment: "부상 후 리커버리 세션 덕분에 완벽하게 복귀할 수 있었습니다. 선수의 컨디션 관리까지 책임져주는 곳입니다.",
      change: "Full Recovery & Return"
    }
  ];

  return (
    <section className="py-24 bg-dark-bg border-t border-[#111]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-4 uppercase">
            Success <span className="text-gold">Stories</span>
          </h2>
          <p className="text-gray-500">SN 트레이닝과 함께 성장한 선수들의 실제 데이터</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <div key={idx} className="bg-[#111] p-10 border border-[#222] hover:border-gold/30 transition-all group">
              <div className="flex text-gold mb-6">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-xs"></i>)}
              </div>
              <p className="text-gray-300 italic mb-10 leading-relaxed">"{item.comment}"</p>
              <div className="flex items-center justify-between border-t border-[#222] pt-6">
                <div>
                  <div className="text-white font-bold">{item.name}</div>
                  <div className="text-gold font-oswald text-[10px] tracking-widest">{item.tag}</div>
                </div>
                <div className="bg-gold/10 text-gold px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
