
import React from 'react';

const StatsBar: React.FC = () => {
  const stats = [
    { title: 'LESSON', sub: 'Technical Skill' },
    { title: 'PHYSICAL', sub: 'Power & Agility' },
    { title: 'RECOVERY', sub: 'Injury Prevention' },
  ];

  return (
    <div className="bg-[#111] border-y border-[#222] py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <h3 className="text-gold font-oswald text-4xl font-bold mb-2">{stat.title}</h3>
            <p className="text-gray-500 font-oswald text-xs tracking-widest font-semibold uppercase">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
