import React from 'react';
import { ApartmentOutlined, RiseOutlined, StarOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import './PdeSolution.css';

const SOLUTIONS = [
  {
    key: 'delivery',
    icon: <ApartmentOutlined />,
    title: '驻场交付',
    desc: '派驻资深工程师到客户现场,深度嵌入业务流程,完成VERT 产品(数据底座、AI平台、云原生平台等)的部署、定制与集成。',
  },
  {
    key: 'solution',
    icon: <RiseOutlined />,
    title: '问题拆解与方案落地',
    desc: '与客户业务团队紧密协作,将复杂业务问题转化为可执行的AI解决方案,负责从需求分析到上线运营的全流程落地。',
  },
  {
    key: 'custom',
    icon: <StarOutlined />,
    title: '定制化开发与集成',
    desc: '基于VERT 的核心平台,为客户开发定制化的 AI Agent、工作流和数据治理模块,解决行业特有的业务痛点',
  },
  {
    key: 'empower',
    icon: <SafetyCertificateOutlined />,
    title: '能力赋能与知识转移',
    desc: '通过培训、文档和最佳实践沉淀,帮助客户团队掌握 VERT产品的使用与运维能力,实现自主迭代。',
  },
] as const;

const PdeSolution: React.FC = () => {
  return (
    <section className="pde-solution">
      <div className="pde-solution__inner">
        <h2 className="pde-solution__title">助力企业,脱离困境</h2>
        <p className="pde-solution__subtitle">
          我们的职责旨在帮助企业减少人为主观干预,基于数据趋势、AI算力提供理性分析及客观决策,显著提升生产力和效率,并有效降低成本。
        </p>
        <div className="pde-solution__cards">
          {SOLUTIONS.map((item) => (
            <div key={item.key} className="pde-solution__card">
              <div className="pde-solution__card-icon">{item.icon}</div>
              <h3 className="pde-solution__card-title">{item.title}</h3>
              <p className="pde-solution__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdeSolution;
