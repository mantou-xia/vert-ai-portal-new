import React from 'react';
import { motion } from 'framer-motion';
import './HomeSubjectKeyword.css';

interface HomeSubjectKeywordProps {
  className?: string;
}

const HomeSubjectKeyword: React.FC<HomeSubjectKeywordProps> = ({ className }) => {
  return (
    <motion.section
      className={`home-subject ${className ?? ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="home-subject__inner">
        <motion.p
          className="home-subject__label"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          开箱即用，生产就绪
        </motion.p>

        <motion.div
          className="home-subject__keywords"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          <motion.div
            className="home-subject__keyword-row"
            variants={{
              hidden: { y: 0, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
          >
            <span className="home-subject__keyword">灵活扩展</span>
          </motion.div>
          <motion.div
            className="home-subject__keyword-row"
            variants={{
              hidden: { y: 48, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
          >
            <span className="home-subject__keyword">稳定可靠</span>
          </motion.div>
          <motion.div
            className="home-subject__keyword-row"
            variants={{
              hidden: { y: 96, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
          >
            <span className="home-subject__keyword">安全保障</span>
          </motion.div>
        </motion.div>

        <motion.p
          className="home-subject__desc"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.6 },
            },
          }}
        >
          VERT 从容应对增长的流量和变化的需求，拥有坚实可靠的基础，
          确保您拥有安心无忧的运营体验，
          以企业级安全，守护您的核心数据资产。
        </motion.p>
      </div>
    </motion.section>
  );
};

export default HomeSubjectKeyword;
