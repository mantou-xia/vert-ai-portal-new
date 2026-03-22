import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './HomeSubjectKeyword.css';

interface HomeSubjectKeywordProps {
  className?: string;
}

const ROW_STEP = 56;
const PHASE1_END = 0.33;
const PHASE2_END = 0.66;
const PHASE3_END = 1.0;

const HomeSubjectKeyword: React.FC<HomeSubjectKeywordProps> = ({ className }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 55%', 'center 50%'],
  });

  const secondKeywordY = useTransform(
    scrollYProgress,
    [0, PHASE1_END],
    [ROW_STEP, 0]
  );
  const thirdKeywordY = useTransform(
    scrollYProgress,
    [PHASE1_END, PHASE2_END],
    [ROW_STEP * 2, 0]
  );
  const textRevealProgress = useTransform(
    scrollYProgress,
    [PHASE2_END, PHASE3_END],
    [0, 1]
  );
  const labelOpacity = useTransform(textRevealProgress, [0, 1], [0, 1]);
  const labelY = useTransform(textRevealProgress, [0, 1], [12, 0]);
  const descOpacity = useTransform(textRevealProgress, [0, 1], [0, 1]);
  const descY = useTransform(textRevealProgress, [0, 1], [12, 0]);

  return (
    <section ref={sectionRef} className={`home-subject ${className ?? ''}`}>
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
          <motion.div
            className="home-subject__keyword-row"
            style={{ y: secondKeywordY }}
          >
            <span className="home-subject__keyword">{t('home.subject.keyword2')}</span>
          </motion.div>
          <motion.div
            className="home-subject__keyword-row"
            style={{ y: thirdKeywordY }}
          >
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
    </section>
  );
};

export default HomeSubjectKeyword;
