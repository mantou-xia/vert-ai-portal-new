import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HomeSubjectKeyword.css';

interface HomeSubjectKeywordProps {
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const HomeSubjectKeyword: React.FC<HomeSubjectKeywordProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<'idle' | 'staggered' | 'aligned' | 'complete'>('idle');
  const hasPlayed = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          setPhase('staggered');
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (phase === 'staggered') {
      const t = setTimeout(() => setPhase('aligned'), 1500);
      return () => clearTimeout(t);
    }
    if (phase === 'aligned') {
      const t = setTimeout(() => setPhase('complete'), 1000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isAligned = phase === 'aligned' || phase === 'complete';
  const showLabel = phase === 'complete';
  const showDesc = phase === 'complete';

  return (
    <section
      ref={sectionRef}
      className={`home-subject ${className ?? ''}`}
    >
      {/* <div className="home-subject__spacer" /> */}
      <div className="home-subject__sticky">
        <div className="home-subject__inner">
          <motion.div
            className="home-subject__label-wrap"
            initial={false}
            animate={{
              height: showLabel ? 48 : 0,
              opacity: showLabel ? 1 : 0,
              marginBottom: showLabel ? 40 : 0,
            }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p className="home-subject__label">开箱即用，生产就绪</p>
          </motion.div>

          <motion.div className="home-subject__keywords">
            <motion.div
              className="home-subject__keyword-row"
              initial={false}
              animate={{
                x: isAligned ? 0 : -100,
                y: isAligned ? 0 : -60,
              }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <span className="home-subject__keyword">灵活扩展</span>
            </motion.div>
            <motion.div
              className="home-subject__keyword-row"
              initial={false}
              animate={{
                x: 0,
                y: isAligned ? 0 : 0,
              }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <span className="home-subject__keyword">稳定可靠</span>
            </motion.div>
            <motion.div
              className="home-subject__keyword-row"
              initial={false}
              animate={{
                x: isAligned ? 0 : 100,
                y: isAligned ? 0 : 60,
              }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <span className="home-subject__keyword">安全保障</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="home-subject__desc-wrap"
            initial={false}
            animate={{
              height: showDesc ? 100 : 0,
              opacity: showDesc ? 1 : 0,
            }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p className="home-subject__desc">
              VERT 从容应对增长的流量和变化的需求，拥有坚实可靠的基础，
              <br />
              确保您拥有安心无忧的运营体验，
              <br />
              以企业级安全，守护您的核心数据资产。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSubjectKeyword;
