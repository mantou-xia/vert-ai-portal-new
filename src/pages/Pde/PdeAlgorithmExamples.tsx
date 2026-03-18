import React, { useState, useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import MessageBoard from '../MessageBoard';
import PartnerCtaButton from '../../components/common/PartnerCtaButton';
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

const CASE_IMAGE = 'https://www.figma.com/api/mcp/asset/7760de7b-ea5f-4789-b6ba-750fe18899f9';
const PROMPT_ICON = 'https://www.figma.com/api/mcp/asset/f1f269c6-55ad-468c-a1c9-6733b9d1a498';
const PROMPT_ACTION_ICON = 'https://www.figma.com/api/mcp/asset/33e24b1a-b456-42bf-a7b6-3c809de7e7d1';

const PdeAlgorithmExamples: React.FC = () => {
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
        <h2 className="pde-algorithm-examples__title">企业级算法解决方案实例</h2>

        <div className="pde-algorithm-examples__block">
          <div className="pde-algorithm-examples__left">
            <div className="pde-algorithm-examples__meta">
              <h3 className="pde-algorithm-examples__company">金鹰集团</h3>
              <p className="pde-algorithm-examples__industry">商贸新零售</p>
            </div>

            <p className="pde-algorithm-examples__intro">
              金鹰集团为商贸新零售标杆企业，VERT.AI为其落地“100+ 业务节点，20+Agent应用场景”，
              实现财务、法务、物业等全链路AI智能化升级，解决人工效率低、数据失真、决策滞后等痛点。
            </p>

            <ul ref={metricsRef} className="pde-algorithm-examples__metrics" aria-label="算法落地成效">
              <li className="pde-algorithm-examples__metric-item">
                <span className="pde-algorithm-examples__metric-label">业务节点</span>
                <span className="pde-algorithm-examples__metric-value-wrap">
                  <CountUpMetric end={100} suffix="+" inView={metricsInView} />
                </span>
              </li>
              <li className="pde-algorithm-examples__metric-item">
                <span className="pde-algorithm-examples__metric-label">Agent应用场景</span>
                <span className="pde-algorithm-examples__metric-value-wrap">
                  <CountUpMetric end={20} suffix="+" inView={metricsInView} />
                </span>
              </li>
              <li className="pde-algorithm-examples__metric-item">
                <span className="pde-algorithm-examples__metric-label">人力成本降低</span>
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
          <div className="pde-algorithm-examples__visual-image-wrapper">
            <div className="pde-algorithm-examples__visual" aria-hidden>
              <div className="pde-algorithm-examples__visual-frame">
                <img className="pde-algorithm-examples__visual-image" src={CASE_IMAGE} alt="" />
              </div>
              <div className="pde-algorithm-examples__prompt">
                <img className="pde-algorithm-examples__prompt-icon" src={PROMPT_ICON} alt="" />
                <span className="pde-algorithm-examples__prompt-text">帮我生成1月的营收报表</span>
                <span className="pde-algorithm-examples__prompt-action">
                  <img src={PROMPT_ACTION_ICON} alt="" />
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default PdeAlgorithmExamples;
