import React, { useState, useRef, useEffect } from 'react';
import './HomeCompanyDetail.css';

type CaseItem = {
  id: string;
  videoPoster: string;
  videoSrc?: string;
  companyName: string;
  companyNameEn: string;
  quote: string;
  stats: { label: string; value: string }[];
};

const CASE_ITEMS: CaseItem[] = [
  {
    id: 'jinying',
    videoPoster: '/images/home/case-jinying-poster.jpg',
    videoSrc: '/videos/case-jinying.mp4',
    companyName: '金鹰集团',
    companyNameEn: 'Golden Eagle',
    quote: '我们正处于 AI 革命的早期阶段，企业需要能够快速验证想法的工具。VERT 帮助我们快速落地 AI 应用，实现业务转型。',
    stats: [
      { label: '录入提效', value: '80%' },
      { label: '识别率', value: '95%' },
      { label: '问答率', value: '90%' },
    ],
  },
  {
    id: 'case2',
    videoPoster: '/images/home/case-poster-placeholder.jpg',
    companyName: '某零售企业',
    companyNameEn: 'Retail Co.',
    quote: 'VERT 平台帮助我们快速构建智能客服，显著提升了客户满意度与运营效率。',
    stats: [
      { label: '响应效率', value: '75%' },
      { label: '满意度', value: '92%' },
      { label: '成本节省', value: '40%' },
    ],
  },
  {
    id: 'case3',
    videoPoster: '/images/home/case-poster-placeholder.jpg',
    companyName: '某制造企业',
    companyNameEn: 'Manufacturing',
    quote: '从数据采集到智能分析，VERT 提供了端到端的 AI 解决方案，助力我们实现智能制造升级。',
    stats: [
      { label: '质检准确率', value: '98%' },
      { label: '产能提升', value: '35%' },
      { label: '故障预测', value: '85%' },
    ],
  },
];

const HomeCompanyDetail: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = CASE_ITEMS[activeIndex] ?? CASE_ITEMS[0];
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dotsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setActiveIndex((i) => (i + 1) % CASE_ITEMS.length);
      } else if (e.deltaY < 0) {
        setActiveIndex((i) => (i - 1 + CASE_ITEMS.length) % CASE_ITEMS.length);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section className="home-company-detail">
      <div className="home-company-detail__inner">
        <header className="home-company-detail__header">
          <h2 className="home-company-detail__title">
            他们已经和我们一起实现了业务转型
          </h2>
        </header>

        <div className="home-company-detail__card">
          <div className="home-company-detail__content">
            <div className="home-company-detail__video">
              <div className="home-company-detail__video-frame">
                <video
                  className="home-company-detail__video-el"
                  src={activeItem.videoSrc}
                  poster={activeItem.videoPoster}
                  controls
                >
                  您的浏览器不支持视频播放。
                </video>
                <div className="home-company-detail__video-play">
                  <span className="home-company-detail__video-play-icon">▶</span>
                </div>
              </div>
            </div>

            <div className="home-company-detail__info">
              <div className="home-company-detail__company">
                <h3 className="home-company-detail__company-name">
                  {activeItem.companyName}
                </h3>
                <span className="home-company-detail__company-en">
                  {activeItem.companyNameEn}
                </span>
              </div>

              <blockquote className="home-company-detail__quote">
                「{activeItem.quote}」
              </blockquote>

              <div className="home-company-detail__stats">
                {activeItem.stats.map((stat) => (
                  <div key={stat.label} className="home-company-detail__stat">
                    <span className="home-company-detail__stat-label">
                      {stat.label}
                    </span>
                    <span className="home-company-detail__stat-value">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={dotsRef}
            className="home-company-detail__dots"
            role="group"
            aria-label="切换公司案例"
          >
            {CASE_ITEMS.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${
                  index === activeIndex ? 'home-company-detail__dot-active' : 'home-company-detail__dot'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`切换到第 ${index + 1} 个案例`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCompanyDetail;
