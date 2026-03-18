import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWheelScroll } from '../../hooks/useWheelScroll';
import { getAssetPath } from '../../utils/path';
import './HomeItemShow.css';

const SLIDER_ICON = '/images/icons/home/slider1.svg';

type Item = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const items: Item[] = [
  {
    id: 'workflow',
    title: '分秒之内，构建强大工作流',
    subtitle: '通过可视化拖拽操作，让你直观构建灵活高效的AI应用和工作流。',
    description: '',
    image: '/images/home/keyboard.png',
  },
  {
    id: 'models',
    title: '无缝接入全球大模型',
    subtitle: '轻松接入全球主流大模型，一键配置即可使用。',
    description: '',
    image: '/images/home/keyboard.png',
  },
  {
    id: 'publish',
    title: '一键发布',
    subtitle: '无需处理后端复杂性，多种发布选项满足你的不同需求。',
    description: '',
    image: '/images/home/keyboard.png',
  },
  {
    id: 'share',
    title: '分享与共建',
    subtitle: '支持工作流的组合和嵌套使用，促进社区共享与团队协作。',
    description: '',
    image: '/images/home/keyboard.png',
  },
];

const HomeItemShow: React.FC = () => {
  const { sectionRef, activeIndex, setActiveIndex, isLocked } = useWheelScroll(
    items.length,
    { scrollThreshold: 120, lockMode: true }
  );
  const activeItem = items[activeIndex] ?? items[0];
  const listRef = useRef<HTMLDivElement>(null);
  const axisRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const [anchorTop, setAnchorTop] = useState(0);
  const [fillHeightPercent, setFillHeightPercent] = useState(0);

  const updateAnchorPosition = () => {
    const list = listRef.current;
    const axis = axisRef.current;
    const icon = iconRef.current;
    const idx = activeIndexRef.current;
    const titleEl = titleRefs.current[idx];
    if (!list || !titleEl || !axis || !icon) return;
    const listRect = list.getBoundingClientRect();
    const axisRect = axis.getBoundingClientRect();
    const titleRect = titleEl.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();
    const titleCenter = titleRect.top - listRect.top + titleRect.height / 2;
    const axisHeight = axisRect.height;
    const iconHeight = iconRect.height;
    const titleCenterFromAxisTop = titleCenter - 8;
    const anchorPct = (titleCenterFromAxisTop / axisHeight) * 100;
    setAnchorTop(anchorPct);
    const iconTopPx = titleCenterFromAxisTop - iconHeight / 2;
    const fillBottomPx = Math.max(0, iconTopPx + 4);
    const fillPct = Math.min(100, (fillBottomPx / axisHeight) * 100);
    setFillHeightPercent(fillPct);
  };

  useEffect(() => {
    updateAnchorPosition();
    const ro = new ResizeObserver(updateAnchorPosition);
    const list = listRef.current;
    if (list) ro.observe(list);
    return () => ro.disconnect();
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className={`home-item-show ${isLocked ? 'home-item-show--locked' : ''}`}
    >
      <div className="home-item-show__inner">
        <header className="home-item-show__header">
          <h2 className="home-item-show__title">
            将 AI 创意变为现实，实现从构想到生产的"飞跃"
          </h2>
        </header>

        <div className="home-item-show__content">
          <div ref={listRef} className="home-item-show__list">
            <div ref={axisRef} className="home-item-show__axis">
              <div className="home-item-show__axis-line">
                <div
                  className="home-item-show__axis-fill"
                  style={{
                    height: `${fillHeightPercent || ((activeIndex + 0.5) / items.length) * 100}%`,
                  }}
                >
                  <div className="home-item-show__axis-fill-imgs">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="home-item-show__axis-fill-img-wrap">
                        <img src={getAssetPath(SLIDER_ICON)} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="home-item-show__axis-icon"
                style={{
                  top: `${anchorTop}%`,
                }}
              >
                <img
                  ref={iconRef}
                  className="home-item-show__axis-icon-img"
                  src={getAssetPath(SLIDER_ICON)}
                  alt=""
                />
              </div>
            </div>
            <div className="home-item-show__items">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`home-item-show__item ${
                    index === activeIndex ? 'home-item-show__item--active' : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="home-item-show__item-text">
                    <div className="home-item-show__item-title-row">
                      <span
                        ref={(el) => { titleRefs.current[index] = el; }}
                        className={`home-item-show__item-title ${
                          index === activeIndex ? 'home-item-show__item-title--active' : ''
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                    <p className="home-item-show__item-desc">{item.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="home-item-show__image">
            <div className="home-item-show__image-frame">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="home-item-show__image-el"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeItemShow;
