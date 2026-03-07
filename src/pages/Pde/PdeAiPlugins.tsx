import React from 'react';
import { getAssetPath } from '../../utils/path';
import './PdeAiPlugins.css';

type PluginCard = {
  key: string;
  title: string;
  subtitle: string;
  pain: string;
  aiService: React.ReactNode;
  coreValue: React.ReactNode;
};

const PLUGINS: PluginCard[] = [
  {
    key: 'aeon',
    title: 'AEON',
    subtitle: 'CDP助手(私域运营)',
    pain: '私域系统操作门槛高,培训成本高;依赖专业人员,运营流程手工配置,SOP难复制',
    aiService: (
      <>
        三大Agent协同,实现&quot;<span className="emphasis"><strong>洞察-圈人-活动-触达-复盘</strong></span>&quot;全链路闭环,自然语言交互降低操作门槛。
      </>
    ),
    coreValue: (
      <>
        减少<span className="percent"><strong>50%</strong></span>系统培训成本、<span className="percent"><strong>30%</strong></span>人力投入;运营流程缩至分钟级,活动上线周期缩短<span className="percent"><strong>80%</strong></span>
      </>
    ),
  },
  {
    key: 'yijiancai',
    title: '易建采',
    subtitle: '商贸新零售',
    pain: '医疗采购跨端操作繁琐、集采分级难;招标/非招标流程不统一,SOP落地难;供应商信用监控缺失;人工操作效率低、监管不透明;采购场景割裂,供应链不通。',
    aiService: (
      <>
        交易+服务+监管<span className="emphasis"><strong>多智能体协同</strong></span>,IM多端一体化,实现<span className="emphasis"><strong>全链路闭环</strong></span>,标准化采购流程,云服务支撑全场景落地。
      </>
    ),
    coreValue: (
      <>
        降低<span className="percent"><strong>40%</strong></span>采购综合成本、<span className="percent"><strong>35%</strong></span>人力投入;集采效率升<span className="percent"><strong>60%</strong></span>,项目周期缩<span className="percent"><strong>50%</strong></span>;供应商信用风险识别率<span className="percent"><strong>80%</strong></span>、合规风险降<span className="percent"><strong>75%</strong></span>;流程标准化,培训成本减<span className="percent"><strong>50%</strong></span>。
      </>
    ),
  },
];

const PdeAiPlugins: React.FC = () => {
  return (
    <section className="pde-ai-plugins">
      <div className="pde-ai-plugins__inner">
        <h2 className="pde-ai-plugins__title">AI 专家插件矩阵</h2>
        <div className="pde-ai-plugins__grid">
          {PLUGINS.map((card) => (
            <article key={card.key} className="pde-ai-plugins__card">
              <div
                className="pde-ai-plugins__card-header"
                style={{
                  backgroundImage: `url(${getAssetPath('/images/home/keyboard.png')})`,
                }}
              >
                <div className="pde-ai-plugins__card-heading">
                  <h3 className="pde-ai-plugins__card-title">{card.title}</h3>
                  <p className="pde-ai-plugins__card-subtitle">{card.subtitle}</p>
                </div>
              </div>
              <div className="pde-ai-plugins__card-body">
                <div className="pde-ai-plugins__pain-wrap">
                  <span className="pde-ai-plugins__pain-tag">痛点</span>
                  <p className="pde-ai-plugins__pain-text">{card.pain}</p>
                </div>
                <div className="pde-ai-plugins__two-col">
                  <div className="pde-ai-plugins__block">
                    <h4 className="pde-ai-plugins__block-title">AI服务</h4>
                    <p className="pde-ai-plugins__block-text">
                      {card.aiService}
                    </p>
                  </div>
                  <div className="pde-ai-plugins__block">
                    <h4 className="pde-ai-plugins__block-title">核心价值</h4>
                    <p className="pde-ai-plugins__block-text">
                      {card.coreValue}
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
