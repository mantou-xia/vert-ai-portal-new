import React from 'react';
import { motion, type Variants } from 'framer-motion';
import './HomeData.css';

type StatCard = {
  id: string;
  title: string;
  description: string;
  label: string;
  value: string;
};

const STAT_CARDS: StatCard[] = [
  {
    id: 'team',
    title: '与团队共同成长',
    description: '助力每一位团队成员快速掌握纵横前沿的智能工具和流程，实现效能与价值双提升。',
    label: '团队',
    value: '40+',
  },
  {
    id: 'industry',
    title: '深受行业领袖信赖',
    description: '涵盖多条典型行业赛道的落地方案，从场景拆解到效果验证，助力客户构建持续竞争优势。',
    label: '行业',
    value: '7+',
  },
  {
    id: 'apps',
    title: '由 VERT 驱动',
    description: '基于统一平台持续交付、运营和优化 AI 应用，帮助企业快速把创意转化为可见成效。',
    label: '应用',
    value: '100+',
  },
];

const numberVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const infoVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const HomeData: React.FC = () => {
  return (
    <motion.section
      className="home-data"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="home-data__inner">
        <motion.header
          className="home-data__header"
          variants={infoVariants}
        >
          <h2 className="home-data__title">为企业成功奠定坚实 AI 基石</h2>
          <p className="home-data__subtitle">
            企业实现 AI 转型，需要的不仅仅是工具，更是坚实可复用的基础设施。
            我们提供可扩展的基础设施、细粒度的访问控制以及闭环的运营能力，
            帮助企业稳健迈向智能时代。
          </p>
        </motion.header>

        <div className="home-data__cards">
          {STAT_CARDS.map((card, index) => (
            <motion.article
              key={card.id}
              className="home-data__card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.div
                className="home-data__card-info"
                variants={infoVariants}
              >
                <h3 className="home-data__card-title">{card.title}</h3>
                <p className="home-data__card-desc">{card.description}</p>
              </motion.div>

              <motion.div
                className="home-data__stat"
                variants={numberVariants}
                transition={{ delay: index * 0.1 }}
              >
                <span className="home-data__stat-label">{card.label}</span>
                <span className="home-data__stat-value">{card.value}</span>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HomeData;
