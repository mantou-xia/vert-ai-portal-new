import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './HomeSubjectKeyword.css';

interface HomeSubjectKeywordProps {
  className?: string;
}

const ROW_STEP = 56;
const PHASE1_END = 0.33;
const PHASE2_END = 0.66;
const PHASE3_END = 1.0;
const PROGRESS_PER_PIXEL = 1 / 900;
const WHEEL_DELTA_THRESHOLD_PX = 1.5;
const WHEEL_DELTA_MODE_LINE = 1;
const WHEEL_DELTA_MODE_PAGE = 2;
const LINE_DELTA_TO_PX = 16;
const PROGRESS_EPSILON = 0.0001;

const clamp = (value: number, min: number, max: number): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const normalizeWheelDelta = (event: WheelEvent): number => {
  if (event.deltaMode === WHEEL_DELTA_MODE_LINE) {
    return event.deltaY * LINE_DELTA_TO_PX;
  }
  if (event.deltaMode === WHEEL_DELTA_MODE_PAGE) {
    return event.deltaY * window.innerHeight;
  }
  return event.deltaY;
};

const HomeSubjectKeyword: React.FC<HomeSubjectKeywordProps> = ({ className }) => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelAccumulatorRef = useRef(0);
  const targetProgress = useMotionValue(0);
  const smoothedProgress = useSpring(targetProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.24,
  });

  useEffect(() => {
    const isTrackStickyActive = (): boolean => {
      const track = trackRef.current;
      if (!track) return false;
      const rect = track.getBoundingClientRect();
      return rect.top <= 0 && rect.bottom >= window.innerHeight;
    };

    const canDriveWithDelta = (deltaY: number, current: number): boolean => {
      if (deltaY === 0) return false;
      if (deltaY > 0) return current < 1 - PROGRESS_EPSILON;
      return current > PROGRESS_EPSILON;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isTrackStickyActive()) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      const deltaY = normalizeWheelDelta(event);
      if (deltaY === 0) return;
      wheelAccumulatorRef.current += deltaY;
      const accumulatedDelta = wheelAccumulatorRef.current;

      const current = targetProgress.get();
      const canDrive = canDriveWithDelta(accumulatedDelta, current);
      if (!canDrive) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (Math.abs(accumulatedDelta) < WHEEL_DELTA_THRESHOLD_PX) return;

      wheelAccumulatorRef.current = 0;
      const next = clamp(current + accumulatedDelta * PROGRESS_PER_PIXEL, 0, 1);
      if (next === current) return;
      targetProgress.set(next);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [targetProgress]);

  const secondKeywordY = useTransform(smoothedProgress, [0, PHASE1_END], [ROW_STEP, 0]);
  const thirdKeywordY = useTransform(smoothedProgress, [PHASE1_END, PHASE2_END], [ROW_STEP * 2, 0]);
  const textRevealProgress = useTransform(smoothedProgress, [PHASE2_END, PHASE3_END], [0, 1]);
  const labelOpacity = useTransform(textRevealProgress, [0, 1], [0, 1]);
  const labelY = useTransform(textRevealProgress, [0, 1], [12, 0]);
  const descOpacity = useTransform(textRevealProgress, [0, 1], [0, 1]);
  const descY = useTransform(textRevealProgress, [0, 1], [12, 0]);

  return (
    <section className={`home-subject ${className ?? ''}`}>
      <div ref={trackRef} className="home-subject__track">
        <div className="home-subject__sticky">
          <div className="home-subject__inner">
            <motion.div
              className="home-subject__label-wrap"
              style={{
                opacity: labelOpacity,
                y: labelY,
              }}
            >
              <p className="home-subject__label">{t('home.subject.label')}</p>
            </motion.div>

            <motion.div className="home-subject__keywords">
              <div className="home-subject__keyword-row">
                <span className="home-subject__keyword">{t('home.subject.keyword1')}</span>
              </div>
              <motion.div className="home-subject__keyword-row" style={{ y: secondKeywordY }}>
                <span className="home-subject__keyword">{t('home.subject.keyword2')}</span>
              </motion.div>
              <motion.div className="home-subject__keyword-row" style={{ y: thirdKeywordY }}>
                <span className="home-subject__keyword">{t('home.subject.keyword3')}</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="home-subject__desc-wrap"
              style={{
                opacity: descOpacity,
                y: descY,
              }}
            >
              <p className="home-subject__desc">
                {t('home.subject.desc1')}
                <br />
                {t('home.subject.desc2')}
                <br />
                {t('home.subject.desc3')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSubjectKeyword;
