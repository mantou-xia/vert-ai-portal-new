import React from 'react';
import { getAssetPath } from '../../utils/path';
import './PdeSolution.css';

type SolutionItem = {
  key: string;
  icon: string;
  title: string;
  desc: string;
};

const SOLUTIONS: SolutionItem[] = [
  {
    key: 'delivery',
    icon: getAssetPath('/images/icons/fde/font_1.svg'),
    title: '驻场交付',
    desc: '派驻资深工程师到客户现场，深度嵌入业务流程，完成 VERT 产品（数据底座、AI 平台、云原生平台等）的部署、定制与集成。',
  },
  {
    key: 'landing',
    icon: getAssetPath('/images/icons/fde/font_2.svg'),
    title: '问题拆解与方案落地',
    desc: '与客户业务团队紧密协作，将复杂业务问题转化为可执行的 AI 解决方案，负责从需求分析到上线运营的全流程落地。',
  },
  {
    key: 'custom',
    icon: getAssetPath('/images/icons/fde/font_3.svg'),
    title: '定制化开发与数据集成',
    desc: '基于 VERT 的核心平台，为客户开发定制化的 AI Agent、工作流和数据治理模块，解决行业特有的业务痛点。',
  },
  {
    key: 'empower',
    icon: getAssetPath('/images/icons/fde/font_4.svg'),
    title: '赋能与知识转移',
    desc: '通过培训、文档和最佳实践沉淀，帮助客户团队掌握 VERT 产品的使用与运维能力，实现自主迭代。',
  },
];

const PdeSolution: React.FC = () => {
  return (
    <section className="pde-solution">
      <div className="pde-solution__inner">
        <div className="pde-solution__heading">
          <h2 className="pde-solution__title">助力企业，脱离困境</h2>
          <p className="pde-solution__subtitle">
            我们的职责旨在帮助企业减少人为主观干预，基于数据趋势、AI算力提供理性分析及客观决策，显著提升生产力和效率，并有效降低成本。
          </p>
        </div>
        <div className="pde-solution__cards">
          {SOLUTIONS.map((item) => (
            <article key={item.key} className="pde-solution__card">
              <div className="pde-solution__card-icon" aria-hidden>
                <img src={item.icon} alt="" />
              </div>
              <h3 className="pde-solution__card-title">{item.title}</h3>
              <p className="pde-solution__card-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdeSolution;
