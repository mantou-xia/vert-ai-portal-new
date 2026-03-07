import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HomeItemShow.css';

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const items: Item[] = [
  {
    id: 'workflow',
    title: '分秒之内，构建强大工作流',
    description: '通过可视化拖拽操作，让你直观构建灵活高效的AI应用和工作流。',
    image: '/images/home/item-workflow.png',
  },
  {
    id: 'models',
    title: '无缝接入全球大模型',
    description: '通过可视化拖拽操作，让你直观构建灵活高效的AI应用和工作流。',
    image: '/images/home/item-models.png',
  },
  {
    id: 'publish',
    title: '一键发布',
    description: '无需处理后期复杂性，多种发布选项满足你的不同需求。',
    image: '/images/home/item-publish.png',
  },
  {
    id: 'share',
    title: '分享与共建',
    description: '支持工作流的场景套件使用，促进社区共享与团队协作。',
    image: '/images/home/item-share.png',
  },
];

const HomeItemShow: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const activeItem = items[activeIndex] ?? items[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      setActiveIndex((prev) => {
        let next = prev;
        if (e.deltaY > 0) {
          next = Math.min(prev + 1, items.length - 1);
        } else if (e.deltaY < 0) {
          next = Math.max(prev - 1, 0);
        }

        if (next !== prev) {
          // 只有在切换条目时才拦截默认滚动
          e.preventDefault();
        }

        return next;
      });
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section ref={sectionRef} className="home-item-show">
      <div className="home-item-show__inner">
        <header className="home-item-show__header">
          <h2 className="home-item-show__title">
            将 AI 创意变为现实，实现从构想到生产的“飞跃”
          </h2>
        </header>

        <div className="home-item-show__content">
          <div className="home-item-show__list">
            <div className="home-item-show__axis">
              <div
                className="home-item-show__anchor"
                style={{
                  top: `${((activeIndex + 0.5) / items.length) * 100}%`,
                  transform: 'translateY(-50%)',
                }}
              />
              <div className="home-item-show__axis-line" />
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
                    <span className="home-item-show__item-dot" />
                    <span className="home-item-show__item-title">{item.title}</span>
                  </div>
                  <p className="home-item-show__item-desc">{item.description}</p>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
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
