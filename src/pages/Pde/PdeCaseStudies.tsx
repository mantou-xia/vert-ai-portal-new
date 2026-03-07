import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssetPath } from '../../utils/path';
import './PdeCaseStudies.css';

const PdeCaseStudies: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="pde-case-studies">
      <div className="pde-case-studies__inner">
        <h2 className="pde-case-studies__title">
          企业级AI「数字员工」落地实例
        </h2>
        <div className="pde-case-studies__block">
          <div className="pde-case-studies__left">
            <h3 className="pde-case-studies__company">英唐智控</h3>
            <p className="pde-case-studies__industry">制造业及分销</p>
            <p className="pde-case-studies__intro">
              VERT.AI企业级AI数字员工并非单纯"人工替代",而是通过"异构数据整合、大模型部署、行业算法定制"打造数据价值闭环,实现三大升级:
            </p>
            <ul className="pde-case-studies__list">
              <li>
                <span className="pde-case-studies__num">①</span>
                效率升级:核心业务提效50%+,部分场景超100%;
              </li>
              <li>
                <span className="pde-case-studies__num">②</span>
                成本升级:各类成本压降30%-80%,规避合规与决策风险;
              </li>
              <li>
                <span className="pde-case-studies__num">③</span>
                决策升级:从"经验驱动"转向"数据驱动",从"事后复盘"转向"实时监测"。
              </li>
            </ul>
            <button
              type="button"
              className="pde-case-studies__btn"
              onClick={() => navigate('/about')}
            >
              成为合作伙伴 →
            </button>
          </div>
          <div className="pde-case-studies__right">
            <img
              className="pde-case-studies__img"
              src={getAssetPath('/images/home/optimization.png')}
              alt="企业级AI数字员工落地实例"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdeCaseStudies;
