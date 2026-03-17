import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PdeStudiesDetail.css';

const EASE = [0.16, 1, 0.3, 1] as const;

type DetailCard = {
  key: string;
  title: string;
  tag: string;
  pain: string;
  aiService: string;
  coreValue: string;
  image: string;
  isAudit?: boolean;
};

const DETAIL_CARDS: DetailCard[] = [
  {
    key: 'service',
    title: 'AI智能客服（企业管理全场景）',
    tag: '痛点',
    pain: '高频咨询占用大量人力，响应慢且无全时段服务；知识上线慢，培训与宣贯成本高。',
    aiService: '集成全场景知识体系，多轮对话精准引导，**7*24h** 在线，支持后台问答统计与文档推荐。',
    coreValue: '**AI替代60%** 高频咨询，咨询响应提至秒级，**80%** 问题AI闭环处理；知识上线同步缩短 **90%**。',
    image: 'https://www.figma.com/api/mcp/asset/a11f3581-5a75-48c2-bdea-1c67ac4bd756',
  },
  {
    key: 'legal',
    title: 'AI法务咨询专家',
    tag: '痛点',
    pain: '人工审核易出错，引发法律纠纷；常规条款筛查占用人手，审批流转慢、沟通成本高。',
    aiService: '实时核对合同附件与OA表单，标注风险条款，与OA **无缝集成**，实现合规预警。',
    coreValue: '关键要素核对错误率降至 **0**，解放法务 **50%** 人力；单份合同审核耗时降低 **50%+**，业务流转周期缩短 **90%**。',
    image: 'https://www.figma.com/api/mcp/asset/0240d441-e3a7-4502-b4cf-f48b98c5d588',
  },
  {
    key: 'audit',
    title: 'AI管理审计（集团管理）',
    tag: '商营',
    pain: '门店存在业绩操控行为，数据失真；人工审计成本高、滞后性强，无法穿透数据"水分"。',
    aiService: '通过多维特征计算经营基准值，**实时对比** 实报线与基线，**自动识别** 异常并预警。',
    coreValue: '替代人工审计，**重构考核体系**，实现管理价值闭环。',
    image: 'https://www.figma.com/api/mcp/asset/0dedae14-c269-4707-b4ff-3a1a602de09a',
    isAudit: true,
  },
];

function parseHighlight(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<React.Fragment key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</React.Fragment>);
    }
    parts.push(
      <span key={`h-${key++}`} className="pde-studies-detail__highlight">
        {match[1]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<React.Fragment key={`t-${key++}`}>{text.slice(lastIndex)}</React.Fragment>);
  }
  return parts.length > 0 ? <>{parts}</> : text;
}

const PdeStudiesDetail: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pde-studies-detail">
      <div className="pde-studies-detail__inner">
        {DETAIL_CARDS.map((card, index) => (
          <motion.article
            key={card.key}
            className={`pde-studies-detail__card${card.isAudit ? ' pde-studies-detail__card--audit' : ''}`}
            initial={{ x: 80, opacity: 0 }}
            animate={hasAnimated ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: EASE,
              delay: index * 0.1,
            }}
          >
            <div className="pde-studies-detail__content">
              <h3 className="pde-studies-detail__title">{card.title}</h3>
              <div className="pde-studies-detail__pain">
                <span className="pde-studies-detail__tag">{card.tag}</span>
                <p className="pde-studies-detail__pain-text">{card.pain}</p>
              </div>
            </div>
            <div className="pde-studies-detail__image-wrap">
              <img src={card.image} alt="" className="pde-studies-detail__image" />
            </div>
            <div className="pde-studies-detail__expand">
              <div className="pde-studies-detail__expand-block">
                <p className="pde-studies-detail__expand-title">AI服务</p>
                <p className="pde-studies-detail__expand-text">
                  {parseHighlight(card.aiService)}
                </p>
              </div>
              <div className="pde-studies-detail__expand-block">
                <p className="pde-studies-detail__expand-title">核心价值</p>
                <p className="pde-studies-detail__expand-text">
                  {parseHighlight(card.coreValue)}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default PdeStudiesDetail;
