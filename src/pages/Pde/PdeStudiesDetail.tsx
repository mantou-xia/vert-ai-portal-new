import React, { useEffect } from 'react';
import './PdeStudiesDetail.css';

type CardItem = {
  key: string;
  title: string;
  pain: string;
  aiService: string;
  coreValue: string;
  image?: string;
};

const CARDS: CardItem[] = [
  {
    key: 'kefu',
    title: 'AI智能客服 (企业管理全场景)',
    pain: '高频咨询占用大量人力，响应慢且无全时段服务；知识上线慢，培训与宣贯成本高。',
    aiService:
      'AI服务: 集成全场景知识体系,多轮对话精准引导,7*24h在线,支持后台问答统计与文档推荐。',
    coreValue:
      '核心价值: AI替代60%高频咨询,咨询响应提至秒级,80%问题AI闭环处理;知识上线同步缩短90%。',
  },
  {
    key: 'fawu',
    title: 'AI法务咨询专家',
    pain: '人工审核易出错,引发法律纠纷;常规条款筛查占用人手,审批流转慢、沟通成本高。',
    aiService:
      'AI服务: 实时核对合同附件与OA表单,标注风险条款,与OA无缝集成,实现合规预警。',
    coreValue:
      '核心价值: 关键要素核对错误率降至0,解放法务50%人力;单份合同审核耗时降低50%+,业务流转周期缩短90%。',
  },
  {
    key: 'shenji',
    title: 'AI管理审计 (集团管理)',
    pain: '门店存在业绩操控行为,数据失真;人工审计成本高、滞后性强,无法穿透数据"水分"。',
    aiService:
      'AI服务: 通过多维特征计算经营基准值,实时对比实报线与基线,自动识别异常并预警。',
    coreValue: '核心价值: 替代人工审计,重构考核体系,实现管理价值闭环。',
  },
];

const HIGHLIGHT_RE = /(\d+%\+?|\d+%|秒级|7\*24h|无缝集成|实时对比|自动识别|重构考核体系)/g;
const highlightText = (text: string) => {
  const parts = text.split(HIGHLIGHT_RE);
  return parts.map((part, i) =>
    part.match(/^\d+%\+?$|^\d+%$|^秒级$|^7\*24h$|^无缝集成$|^实时对比$|^自动识别$|^重构考核体系$/) ? (
      <span key={i} className="pde-studies-detail__slide-highlight">{part}</span>
    ) : (
      part
    )
  );
};

const PdeStudiesDetail: React.FC = () => {
  const [hasEntered, setHasEntered] = React.useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setHasEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="pde-studies-detail">
      <div className="pde-studies-detail__viewport">
        <div
          className="pde-studies-detail__track"
          style={{
            transform: hasEntered ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
        {CARDS.map((card) => (
          <div key={card.key} className="pde-studies-detail__card">
            <div className="pde-studies-detail__card-inner">
              <h3 className="pde-studies-detail__card-title">{card.title}</h3>
              <div className="pde-studies-detail__card-pain-wrap">
                <span className="pde-studies-detail__pain-tag">痛点</span>
                <p className="pde-studies-detail__card-pain">{card.pain}</p>
              </div>
              <div className="pde-studies-detail__card-img-wrap">
                {card.image ? (
                  <img
                    className="pde-studies-detail__card-img"
                    src={card.image}
                    alt=""
                  />
                ) : (
                  <div className="pde-studies-detail__card-img-placeholder" />
                )}
              </div>
              <div className="pde-studies-detail__card-slide">
                <div className="pde-studies-detail__slide-block">
                  <h4 className="pde-studies-detail__slide-title">AI服务</h4>
                  <p className="pde-studies-detail__slide-text">
                    {highlightText(card.aiService.replace(/^AI服务:\s*/, ''))}
                  </p>
                </div>
                <div className="pde-studies-detail__slide-block">
                  <h4 className="pde-studies-detail__slide-title">核心价值</h4>
                  <p className="pde-studies-detail__slide-text">
                    {highlightText(card.coreValue.replace(/^核心价值:\s*/, ''))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default PdeStudiesDetail;
