import React, { useState, useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCountUp } from '../../hooks/useCountUp';
import MessageBoard from '../MessageBoard';
import PartnerCtaButton from '../../components/common/PartnerCtaButton';
import { getAssetPath } from '../../utils/path';
import './PdeAlgorithmExamples.css';

const slotVariants: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const CountUpMetric: React.FC<{
  end: number;
  suffix: string;
  inView: boolean;
}> = ({ end, suffix, inView }) => {
  const value = useCountUp({ end, duration: 2000, enabled: inView });
  return (
    <motion.span
      className="pde-algorithm-examples__metric-value"
      variants={slotVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {value}{suffix}
    </motion.span>
  );
};

const VISUAL_BACK_IMAGE = getAssetPath('/images/icons/fde/PdeAlgorithmExamples_back.png');
const VISUAL_MAIN_IMAGE = getAssetPath('/images/icons/fde/image_PdeAlgorithmExamples.png');
const VISUAL_PROMPT_BACK_IMAGE = getAssetPath('/images/icons/fde/propmt_back.png');
const VISUAL_PROMPT_ICON = getAssetPath('/images/icons/icon1.png');
const VISUAL_PROMPT_ACTION = getAssetPath('/images/icons/icon2.png');

const PdeAlgorithmExamples: React.FC = () => {
  const { t } = useTranslation();
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [metricsInView, setMetricsInView] = useState(false);
  const metricsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMetricsInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="pde-algorithm-examples">
      <div className="pde-algorithm-examples__inner">
        <h2 className="pde-algorithm-examples__title">{t('fde.algorithm.title')}</h2>

        <div className="pde-algorithm-examples__block">
          <div className="pde-algorithm-examples__left">
            <div className="pde-algorithm-examples__meta">
              <h3 className="pde-algorithm-examples__company">{t('fde.algorithm.company')}</h3>
              <p className="pde-algorithm-examples__industry">{t('fde.algorithm.industry')}</p>
            </div>

            <p className="pde-algorithm-examples__intro">
              {t('fde.algorithm.intro')}
            </p>

            <ul ref={metricsRef} className="pde-algorithm-examples__metrics" aria-label={t('fde.algorithm.metricsAria')}>
              <li className="pde-algorithm-examples__metric-item">
                <span className="pde-algorithm-examples__metric-label">{t('fde.algorithm.metric1')}</span>
                <span className="pde-algorithm-examples__metric-value-wrap">
                  <CountUpMetric end={100} suffix="+" inView={metricsInView} />
                </span>
              </li>
              <li className="pde-algorithm-examples__metric-item">
                <span className="pde-algorithm-examples__metric-label">{t('fde.algorithm.metric2')}</span>
                <span className="pde-algorithm-examples__metric-value-wrap">
                  <CountUpMetric end={20} suffix="+" inView={metricsInView} />
                </span>
              </li>
              <li className="pde-algorithm-examples__metric-item">
                <span className="pde-algorithm-examples__metric-label">{t('fde.algorithm.metric3')}</span>
                <span className="pde-algorithm-examples__metric-value-wrap">
                  <CountUpMetric end={60} suffix="%+" inView={metricsInView} />
                </span>
              </li>
            </ul>

            <PartnerCtaButton
              className="pde-algorithm-examples__btn"
              onClick={() => setIsMessageOpen(true)}
            />
          </div>
          <div className="pde-algorithm-examples__visual" aria-hidden>
            <img
              className="pde-algorithm-examples__visual-back"
              src={VISUAL_BACK_IMAGE}
              alt=""
            />
            <div className="pde-algorithm-examples__visual-main">
              <img className="pde-algorithm-examples__visual-main-image" src={VISUAL_MAIN_IMAGE} alt="" />
            </div>
            <div className="pde-algorithm-examples__prompt">
              <img className="pde-algorithm-examples__prompt-back" src={VISUAL_PROMPT_BACK_IMAGE} alt="" />
              <img className="pde-algorithm-examples__prompt-icon" src={VISUAL_PROMPT_ICON} alt="" />
              <span className="pde-algorithm-examples__prompt-text">{t('fde.algorithm.prompt')}</span>
              <img className="pde-algorithm-examples__prompt-action" src={VISUAL_PROMPT_ACTION} alt="" />
            </div>
          </div>
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default PdeAlgorithmExamples;
