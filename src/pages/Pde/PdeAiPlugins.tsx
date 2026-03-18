import React from 'react';
import './PdeAiPlugins.css';

type TextSegment = {
  text: string;
  strong?: boolean;
};

type PluginCard = {
  key: string;
  title: string;
  subtitle: string;
  cover: string;
  coverOverlay?: boolean;
  coverTextTop: number;
  pain: string;
  painTextWidth: number;
  dividerWidth: number;
  aiTextWidth: number;
  coreValueWidth: number;
  aiService: TextSegment[];
  coreValue: TextSegment[];
};

const PLUGINS: PluginCard[] = [
  {
    key: 'aeon',
    title: 'AEON',
    subtitle: 'CDP助手（私域运营）',
    cover: 'https://www.figma.com/api/mcp/asset/f8145b66-e387-453c-848b-efce1e0286ac',
    coverOverlay: true,
    coverTextTop: 38,
    pain: '私域系统操作门槛高，培训成本高；依赖专业人员，运营流程手工配置，SOP难复制',
    painTextWidth: 582,
    dividerWidth: 634,
    aiTextWidth: 268,
    coreValueWidth: 285,
    aiService: [
      { text: '三大Agent协同，实现' },
      { text: '“洞察-圈人-活动-触达-复盘”', strong: true },
      { text: '全链路闭环，自然语言交互降低操作门槛。' },
    ],
    coreValue: [
      { text: '减少' },
      { text: '50%', strong: true },
      { text: '系统培训成本、' },
      { text: '30%', strong: true },
      { text: '人力投入；运营流程缩至分钟级，活动上线周期缩短' },
      { text: '80%', strong: true },
      { text: '。' },
    ],
  },
  {
    key: 'yijiancai',
    title: '易建采',
    subtitle: '大型医院采购',
    cover: 'https://www.figma.com/api/mcp/asset/b532bfd8-d880-491a-80eb-2c245a3211e6',
    coverTextTop: 40,
    pain:
      '医疗采购跨端操作繁琐、集采分级难；招标 / 非招标流程不统一，SOP 落地难；供应商信用监控缺失；人工操作效率低、监管不透明；采购场景割裂，供应链不通。',
    painTextWidth: 590,
    dividerWidth: 636,
    aiTextWidth: 268,
    coreValueWidth: 300,
    aiService: [
      { text: '交易 + 服务 + 监管' },
      { text: '多智能体协同', strong: true },
      { text: '，IM多端一体化，实现' },
      { text: '全链路闭环', strong: true },
      { text: '，标准化采购流程，云服务支撑全场景落地。' },
    ],
    coreValue: [
      { text: '降低 ' },
      { text: '40%', strong: true },
      { text: ' 采购综合成本、' },
      { text: '35%', strong: true },
      { text: ' 人力投入；集采效率升 ' },
      { text: '60%', strong: true },
      { text: '，项目周期缩 ' },
      { text: '50%', strong: true },
      { text: '；供应商信用风险识别率 ' },
      { text: '80%', strong: true },
      { text: '、合规风险降 ' },
      { text: '75%', strong: true },
      { text: '；流程标准化，培训成本减 ' },
      { text: '50%', strong: true },
      { text: '。' },
    ],
  },
];

const renderSegments = (segments: TextSegment[]) =>
  segments.map((segment, index) => (
    <span key={`${segment.text}-${index}`} className={segment.strong ? 'is-strong' : ''}>
      {segment.text}
    </span>
  ));

const PdeAiPlugins: React.FC = () => {
  return (
    <section className="pde-ai-plugins">
      <div className="pde-ai-plugins__inner">
        <h2 className="pde-ai-plugins__title">AI 专家插件矩阵</h2>

        <div className="pde-ai-plugins__grid">
          {PLUGINS.map((card) => (
            <article key={card.key} className={`pde-ai-plugins__card pde-ai-plugins__card--${card.key}`}>
              <div className="pde-ai-plugins__cover-wrap">
                <img className="pde-ai-plugins__cover" src={card.cover} alt="" />
                {card.coverOverlay && <span className="pde-ai-plugins__cover-overlay" aria-hidden />}
                <div className="pde-ai-plugins__cover-text" style={{ top: `${card.coverTextTop}px` }}>
                  <h3 className="pde-ai-plugins__card-title">{card.title}</h3>
                  <p className="pde-ai-plugins__card-subtitle">{card.subtitle}</p>
                </div>
              </div>

              <div className="pde-ai-plugins__content">
                <div className="pde-ai-plugins__pain-row">
                  <span className="pde-ai-plugins__pain-tag">痛点</span>
                  <p className="pde-ai-plugins__pain-text" style={{ maxWidth: `${card.painTextWidth}px` }}>
                    {card.pain}
                  </p>
                </div>

                <div className="pde-ai-plugins__divider" style={{ width: `${card.dividerWidth}px` }} />

                <div className="pde-ai-plugins__cols">
                  <div className="pde-ai-plugins__col">
                    <h4 className="pde-ai-plugins__col-title">AI服务</h4>
                    <p className="pde-ai-plugins__col-text" style={{ maxWidth: `${card.aiTextWidth}px` }}>
                      {renderSegments(card.aiService)}
                    </p>
                  </div>
                  <div className="pde-ai-plugins__col">
                    <h4 className="pde-ai-plugins__col-title">核心价值</h4>
                    <p className="pde-ai-plugins__col-text" style={{ maxWidth: `${card.coreValueWidth}px` }}>
                      {renderSegments(card.coreValue)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdeAiPlugins;
