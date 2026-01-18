
import React from 'react';
import Button from './Button';

const LocationSection: React.FC = () => {
  const address = "충남 천안시 서북구 동서대로 129, 단국성정빌딩 10층";
  const brandName = "에스앤 트레이닝 센터";
  
  const openMap = (type: 'naver' | 'kakao') => {
    const searchQuery = encodeURIComponent(`${brandName} 천안`);
    if (type === 'naver') {
      window.open(`https://map.naver.com/v5/search/${searchQuery}`, '_blank');
    } else {
      window.open(`https://map.kakao.com/?q=${searchQuery}`, '_blank');
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    alert('주소가 복사되었습니다.');
  };

  return (
    <section className="py-24 bg-dark-bg border-t border-[#111]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold font-oswald tracking-[4px] uppercase text-xs mb-4 block">Visit our Lab</span>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-8 uppercase">Location</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-gold"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">에스앤 트레이닝 센터</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-2">{address}</p>
                  <button 
                    onClick={copyAddress}
                    className="text-xs text-gold/60 hover:text-gold border-b border-gold/30 pb-0.5 transition-colors"
                  >
                    주소 복사하기
                  </button>
                  <p className="text-gray-600 text-xs mt-3">성정동 롯데마트 인근 / 단국대학교 천안캠퍼스 방면</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-parking text-gold"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Parking Guide</h4>
                  <div className="text-gray-400 text-sm space-y-1">
                    <p>• 건물 내 지하 주차장 이용 가능</p>
                    <p>• 건물 뒷편 <strong>세븐일레븐 맞은편</strong> 야외주차장 이용</p>
                    <p className="text-gold/80 text-xs mt-2">* 방문객 무료 주차 지원</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="text-xs px-8" onClick={() => openMap('naver')}>
                <i className="fab fa-neos mr-2 text-[#03C75A]"></i> 네이버 지도
              </Button>
              <Button variant="outline" className="text-xs px-8" onClick={() => openMap('kakao')}>
                <i className="fas fa-comment mr-2 text-[#FEE500]"></i> 카카오 맵
              </Button>
            </div>
          </div>

          <div className="relative h-[450px] bg-[#111] border border-white/5 overflow-hidden group rounded-sm">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076&auto=format&fit=crop')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gold blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gold rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                  <i className="fas fa-map-pin text-black text-3xl"></i>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/80 backdrop-blur-xl border border-white/10">
              <p className="text-gold font-oswald text-xs tracking-[3px] uppercase mb-2 font-bold">SN Training Center</p>
              <p className="text-white text-sm font-medium leading-relaxed">
                천안 최고의 엘리트 축구 시설<br/>
                <span className="text-gray-400 font-normal text-xs">최첨단 실내 트레이닝 랩 & 피지컬 존</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
