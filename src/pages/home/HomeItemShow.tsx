import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './HomeItemShow.css';

const SLIDER_ICON = '/images/icons/home/slider1.svg';

type Item = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

const HomeItemShow: React.FC = () => {
  const { t } = useTranslation();

  const items = useMemo<Item[]>(
    () => [
      {
        id: 'workflow',
        title: t('home.itemShow.workflowTitle'),
        subtitle: t('home.itemShow.workflowSubtitle'),
        image: '/images/home/keyboard.png',
      },
      {
        id: 'models',
        title: t('home.itemShow.modelsTitle'),
        subtitle: t('home.itemShow.modelsSubtitle'),
        image: '/images/home/keyboard.png',
      },
      {
        id: 'publish',
        title: t('home.itemShow.publishTitle'),
        subtitle: t('home.itemShow.publishSubtitle'),
        image: '/images/home/keyboard.png',
      },
      {
        id: 'share',
        title: t('home.itemShow.shareTitle'),
        subtitle: t('home.itemShow.shareSubtitle'),
        image: '/images/home/keyboard.png',
      },
    ],
    [t]
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = items[activeIndex] ?? items[0];
  const listRef = useRef<HTMLDivElement>(null);
  const axisRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [anchorTop, setAnchorTop] = useState(0);
  const [fillHeightPercent, setFillHeightPercent] = useState(0);

  const updateAnchorPosition = useCallback(() => {
    const list = listRef.current;
    const axis = axisRef.current;
    const icon = iconRef.current;
    const idx = activeIndex;
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
  }, [activeIndex]);

  useEffect(() => {
    updateAnchorPosition();
    const ro = new ResizeObserver(updateAnchorPosition);
    const list = listRef.current;
    if (list) ro.observe(list);
    return () => ro.disconnect();
  }, [updateAnchorPosition]);

  return (
    <section className="home-item-show">
      <div className="home-item-show__inner">
        <header className="home-item-show__header">
          <h2 className="home-item-show__title">{t('home.itemShow.title')}</h2>
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
              <div className="home-item-show__axis-icon" style={{ top: `${anchorTop}%` }}>
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
                  className={`home-item-show__item ${index === activeIndex ? 'home-item-show__item--active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="home-item-show__item-text">
                    <div className="home-item-show__item-title-row">
                      <span
                        ref={(el) => {
                          titleRefs.current[index] = el;
                        }}
                        className={`home-item-show__item-title ${index === activeIndex ? 'home-item-show__item-title--active' : ''}`}
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="home-item-show__image-el"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
