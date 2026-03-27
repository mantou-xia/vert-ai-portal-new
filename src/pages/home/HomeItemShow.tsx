import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './HomeItemShow.css';

const BASE_ICON_WIDTH = 26;
const BASE_ICON_HEIGHT = 38;
const ICON_ANCHOR_Y = 24.2692;
const EASE_OUT = [0.4, 0, 0.2, 1] as const;
const TRANSITION_DURATION = 0.4;
const WHEEL_SWITCH_THRESHOLD = 60;
const WHEEL_SWITCH_LOCK_MS = 180;

type Item = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

const clamp = (value: number, min: number, max: number): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const withOffset = (base: number, offset: number): number => Number((base + offset).toFixed(4));

const getMainBodyPath = (extendY: number): string =>
  `M16.073 ${withOffset(27.4192, extendY)}C17.469 ${withOffset(26.1883, extendY)} 20.6776 ${withOffset(25.0602, extendY)} 22.2673 ${withOffset(24.5524, extendY)}C22.5775 ${withOffset(24.4533, extendY)} 22.5776 ${withOffset(24.0851, extendY)} 22.2673 ${withOffset(23.9859, extendY)}C20.6774 ${withOffset(23.4778, extendY)} 17.468 ${withOffset(22.3492, extendY)} 16.073 ${withOffset(21.1193, extendY)}C14.7164 ${withOffset(19.9231, extendY)} 13.4702 1.64087 12.8723 0.202297C12.7603 -0.0671806 12.2438 -0.0666466 12.1328 0.203083C11.5435 1.6346 10.312 ${withOffset(19.8979, extendY)} 8.92678 ${withOffset(21.1193, extendY)}C7.53085 ${withOffset(22.35, extendY)} 4.32252 ${withOffset(23.4781, extendY)} 2.73271 ${withOffset(23.986, extendY)}C2.42243 ${withOffset(24.0851, extendY)} 2.42243 ${withOffset(24.4534, extendY)} 2.73271 ${withOffset(24.5525, extendY)}C4.32252 ${withOffset(25.0604, extendY)} 7.53085 ${withOffset(26.1884, extendY)} 8.92678 ${withOffset(27.4192, extendY)}C10.2946 ${withOffset(28.6252, extendY)} 11.5495 ${withOffset(31.3648, extendY)} 12.142 ${withOffset(32.7961, extendY)}C12.2526 ${withOffset(33.0631, extendY)} 12.7578 ${withOffset(33.0663, extendY)} 12.8715 ${withOffset(32.8001, extendY)}C13.4921 ${withOffset(31.3468, extendY)} 14.7984 ${withOffset(28.543, extendY)} 16.073 ${withOffset(27.4192, extendY)}Z`;

const getLowerStarPath = (extendY: number): string =>
  `M5.42918 ${withOffset(32.062, extendY)}C5.98759 ${withOffset(32.6272, extendY)} 7.27103 ${withOffset(33.1453, extendY)} 7.90692 ${withOffset(33.3785, extendY)}C8.03102 ${withOffset(33.424, extendY)} 8.03103 ${withOffset(33.5931, extendY)} 7.90694 ${withOffset(33.6386, extendY)}C7.27095 ${withOffset(33.872, extendY)} 5.98719 ${withOffset(34.3902, extendY)} 5.42918 ${withOffset(34.9551, extendY)}C4.88656 ${withOffset(35.5044, extendY)} 4.38808 ${withOffset(36.7467, extendY)} 4.14893 ${withOffset(37.4073, extendY)}C4.10413 ${withOffset(37.5311, extendY)} 3.89754 ${withOffset(37.5308, extendY)} 3.85312 ${withOffset(37.407, extendY)}C3.6174 ${withOffset(36.7496, extendY)} 3.1248 ${withOffset(35.516, extendY)} 2.57071 ${withOffset(34.9551, extendY)}C2.01234 ${withOffset(34.3899, extendY)} 0.729009 ${withOffset(33.8718, extendY)} 0.0930844 ${withOffset(33.6386, extendY)}C-0.0310282 ${withOffset(33.5931, extendY)} -0.0310281 ${withOffset(33.424, extendY)} 0.0930845 ${withOffset(33.3784, extendY)}C0.72901 ${withOffset(33.1452, extendY)} 2.01234 ${withOffset(32.6272, extendY)} 2.57071 ${withOffset(32.062, extendY)}C3.11783 ${withOffset(31.5081, extendY)} 3.6198 ${withOffset(30.25, extendY)} 3.85681 ${withOffset(29.5927, extendY)}C3.90102 ${withOffset(29.4701, extendY)} 4.10313 ${withOffset(29.4687, extendY)} 4.1486 ${withOffset(29.5909, extendY)}C4.39684 ${withOffset(30.2583, extendY)} 4.91937 ${withOffset(31.5459, extendY)} 5.42918 ${withOffset(32.062, extendY)}Z`;

const getUpperStarPath = (extendY: number): string =>
  `M23.4292 ${withOffset(15.062, extendY)}C23.9876 ${withOffset(15.6272, extendY)} 25.271 ${withOffset(16.1453, extendY)} 25.9069 ${withOffset(16.3785, extendY)}C26.031 ${withOffset(16.424, extendY)} 26.031 ${withOffset(16.5931, extendY)} 25.9069 ${withOffset(16.6386, extendY)}C25.271 ${withOffset(16.872, extendY)} 23.9872 ${withOffset(17.3902, extendY)} 23.4292 ${withOffset(17.9551, extendY)}C22.8866 ${withOffset(18.5044, extendY)} 22.3881 ${withOffset(19.7467, extendY)} 22.1489 ${withOffset(20.4073, extendY)}C22.1041 ${withOffset(20.5311, extendY)} 21.8975 ${withOffset(20.5308, extendY)} 21.8531 ${withOffset(20.407, extendY)}C21.6174 ${withOffset(19.7496, extendY)} 21.1248 ${withOffset(18.516, extendY)} 20.5707 ${withOffset(17.9551, extendY)}C20.0123 ${withOffset(17.3899, extendY)} 18.729 ${withOffset(16.8718, extendY)} 18.0931 ${withOffset(16.6386, extendY)}C17.969 ${withOffset(16.5931, extendY)} 17.969 ${withOffset(16.424, extendY)} 18.0931 ${withOffset(16.3784, extendY)}C18.729 ${withOffset(16.1452, extendY)} 20.0123 ${withOffset(15.6272, extendY)} 20.5707 ${withOffset(15.062, extendY)}C21.1178 ${withOffset(14.5081, extendY)} 21.6198 ${withOffset(13.25, extendY)} 21.8568 ${withOffset(12.5927, extendY)}C21.901 ${withOffset(12.4701, extendY)} 22.1031 ${withOffset(12.4687, extendY)} 22.1486 ${withOffset(12.5909, extendY)}C22.3968 ${withOffset(13.2583, extendY)} 22.9194 ${withOffset(14.5459, extendY)} 23.4292 ${withOffset(15.062, extendY)}Z`;

const HomeItemShow: React.FC = () => {
  const { t } = useTranslation();

  const items = useMemo<Item[]>(
    () => [
      {
        id: 'fde',
        title: t('home.itemShow.fdeTitle'),
        subtitle: t('home.itemShow.fdeSubtitle'),
        image: getAssetPath('/images/home/image1.png'),
      },
      {
        id: 'maas',
        title: t('home.itemShow.maasTitle'),
        subtitle: t('home.itemShow.maasSubtitle'),
        image: getAssetPath('/images/home/image2.png'),
      },
      {
        id: 'flow',
        title: t('home.itemShow.flowTitle'),
        subtitle: t('home.itemShow.flowSubtitle'),
        image: getAssetPath('/images/home/image3.png'),
      },
      {
        id: 'insight',
        title: t('home.itemShow.insightTitle'),
        subtitle: t('home.itemShow.insightSubtitle'),
        image: getAssetPath('/images/home/image4.png'),
      },
      {
        id: 'core',
        title: t('home.itemShow.coreTitle'),
        subtitle: t('home.itemShow.coreSubtitle'),
        image: getAssetPath('/images/home/image5.png'),
      },
    ],
    [t]
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = items[activeIndex] ?? items[0];
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const axisRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [anchorTopPx, setAnchorTopPx] = useState(0);
  const [extendY, setExtendY] = useState(0);
  const wheelDeltaRef = useRef(0);
  const wheelLockUntilRef = useRef(0);
  const anchorMotion = useMotionValue(0);
  const extendMotion = useMotionValue(0);
  const [animatedAnchorTopPx, setAnimatedAnchorTopPx] = useState(0);
  const [animatedExtendY, setAnimatedExtendY] = useState(0);

  const updateAnchorPosition = useCallback(() => {
    const list = listRef.current;
    const axis = axisRef.current;
    const activeTitleEl = titleRefs.current[activeIndex];
    const firstTitleEl = titleRefs.current[0];
    if (!list || !axis || !activeTitleEl || !firstTitleEl) return;

    const listRect = list.getBoundingClientRect();
    const axisRect = axis.getBoundingClientRect();
    const axisTopFromList = axisRect.top - listRect.top;

    const getTitleCenterFromAxisTop = (titleEl: HTMLSpanElement): number => {
      const titleRect = titleEl.getBoundingClientRect();
      const titleCenterFromListTop = titleRect.top - listRect.top + titleRect.height / 2;
      return titleCenterFromListTop - axisTopFromList;
    };

    const activeTitleCenter = getTitleCenterFromAxisTop(activeTitleEl);
    const firstTitleCenter = getTitleCenterFromAxisTop(firstTitleEl);
    const activeTitleCenterClamped = clamp(activeTitleCenter, 0, axisRect.height);
    const firstTitleCenterClamped = clamp(firstTitleCenter, 0, axisRect.height);

    setAnchorTopPx(activeTitleCenterClamped);
    setExtendY(Math.max(0, activeTitleCenterClamped - firstTitleCenterClamped));
  }, [activeIndex]);

  useEffect(() => {
    updateAnchorPosition();
    const ro = new ResizeObserver(updateAnchorPosition);
    const list = listRef.current;
    if (list) ro.observe(list);
    return () => ro.disconnect();
  }, [updateAnchorPosition]);

  useEffect(() => {
    const controls = animate(anchorMotion, anchorTopPx, {
      duration: TRANSITION_DURATION,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [anchorMotion, anchorTopPx]);

  useEffect(() => {
    const controls = animate(extendMotion, extendY, {
      duration: TRANSITION_DURATION,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [extendMotion, extendY]);

  useMotionValueEvent(anchorMotion, 'change', (latest) => {
    setAnimatedAnchorTopPx(latest);
  });

  useMotionValueEvent(extendMotion, 'change', (latest) => {
    setAnimatedExtendY(latest);
  });

  const iconHeight = BASE_ICON_HEIGHT + animatedExtendY;
  const iconAnchorOffset = ICON_ANCHOR_Y + animatedExtendY;
  const mainBodyPath = useMemo(() => getMainBodyPath(animatedExtendY), [animatedExtendY]);
  const lowerStarPath = useMemo(() => getLowerStarPath(animatedExtendY), [animatedExtendY]);
  const upperStarPath = useMemo(() => getUpperStarPath(animatedExtendY), [animatedExtendY]);

  const isDesktopViewport = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 1024;
  }, []);

  const isTrackStickyActive = useCallback((): boolean => {
    if (!isDesktopViewport()) return false;
    const track = trackRef.current;
    if (!track) return false;

    const rect = track.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom >= window.innerHeight;
  }, [isDesktopViewport]);

  useEffect(() => {
    const handleWindowWheel = (event: WheelEvent) => {
      if (!isTrackStickyActive()) {
        wheelDeltaRef.current = 0;
        wheelLockUntilRef.current = 0;
        return;
      }

      const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
      if (direction === 0) return;

      const atStart = activeIndex <= 0;
      const atEnd = activeIndex >= items.length - 1;
      const canConsume = (direction > 0 && !atEnd) || (direction < 0 && !atStart);

      if (!canConsume) {
        wheelDeltaRef.current = 0;
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const now = window.performance.now();
      if (now < wheelLockUntilRef.current) return;

      wheelDeltaRef.current += event.deltaY;
      if (Math.abs(wheelDeltaRef.current) < WHEEL_SWITCH_THRESHOLD) return;

      const switchDirection = wheelDeltaRef.current > 0 ? 1 : -1;
      wheelDeltaRef.current = 0;
      wheelLockUntilRef.current = now + WHEEL_SWITCH_LOCK_MS;

      setActiveIndex((prev) => clamp(prev + switchDirection, 0, items.length - 1));
    };

    window.addEventListener('wheel', handleWindowWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWindowWheel);
  }, [activeIndex, isTrackStickyActive, items.length]);

  return (
    <section className="home-item-show">
      <div ref={trackRef} className="home-item-show__track">
        <div className="home-item-show__sticky">
          <div className="home-item-show__inner">
            <header className="home-item-show__header">
              <h2 className="home-item-show__title">{t('home.itemShow.title')}</h2>
            </header>

            <div className="home-item-show__content">
              <div ref={listRef} className="home-item-show__list">
                <div ref={axisRef} className="home-item-show__axis">
                  <div className="home-item-show__axis-line" />
                  <div
                    className="home-item-show__axis-icon"
                    style={{
                      top: `${animatedAnchorTopPx}px`,
                      transform: `translate(-50%, -${iconAnchorOffset}px)`,
                    }}
                  >
                    <svg
                      className="home-item-show__axis-icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width={BASE_ICON_WIDTH}
                      height={iconHeight}
                      viewBox={`0 0 ${BASE_ICON_WIDTH} ${iconHeight}`}
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d={mainBodyPath} fill="black" />
                      <path d={lowerStarPath} fill="#98EF00" />
                      <path d={upperStarPath} fill="#98EF00" />
                    </svg>
                  </div>
                </div>
                <div className="home-item-show__items">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`home-item-show__item ${index === activeIndex ? 'home-item-show__item--active' : ''}`}
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
                    </div>
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
        </div>
      </div>
    </section>
  );
};

export default HomeItemShow;
