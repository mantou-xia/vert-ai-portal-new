import React from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerCtaButton from '../../components/common/PartnerCtaButton';
import './PdeAlgorithmExamples.css';

const CASE_IMAGE_BOTTOM = 'https://www.figma.com/api/mcp/asset/bfc8cebe-9556-4f5f-87f3-5d19c74f08cb';
const CASE_IMAGE_MIDDLE = 'https://www.figma.com/api/mcp/asset/89d1f2d6-95ab-4d81-941a-a8a17bb960d9';
const CASE_IMAGE_TOP = 'https://www.figma.com/api/mcp/asset/d52ce47d-4d64-4e41-aa6a-dba6c49b028b';

const PdeAlgorithmExamples: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="pde-algorithm-examples">
      <div className="pde-algorithm-examples__inner">
        <h2 className="pde-algorithm-examples__title">企业级AI 「数字员工」落地实例</h2>

        <div className="pde-algorithm-examples__block">
          <div className="pde-algorithm-examples__left">
            <div className="pde-algorithm-examples__meta">
              <h3 className="pde-algorithm-examples__company">英唐智控</h3>
              <p className="pde-algorithm-examples__industry">制造业及分销</p>
            </div>

            <p className="pde-algorithm-examples__intro">
              VERT.AI企业级AI数字员工并非单纯“人工替代”，而是通过“异构数据整合、大模型部署、行业算法定制”打造数据价值闭环，实现三大升级：
            </p>

            <ul className="pde-algorithm-examples__upgrades" aria-label="落地升级成果">
              <li className="pde-algorithm-examples__upgrade-item">
                <span className="pde-algorithm-examples__upgrade-index">①</span>
                <span className="pde-algorithm-examples__upgrade-text">
                  效率升级：核心业务提效50%+，部分场景超100%；
                </span>
              </li>
              <li className="pde-algorithm-examples__upgrade-item">
                <span className="pde-algorithm-examples__upgrade-index">②</span>
                <span className="pde-algorithm-examples__upgrade-text">
                  成本升级：各类成本压降30%-80%，规避合规与决策风险；
                </span>
              </li>
              <li className="pde-algorithm-examples__upgrade-item">
                <span className="pde-algorithm-examples__upgrade-index">③</span>
                <span className="pde-algorithm-examples__upgrade-text">
                  决策升级：从“经验驱动”转向“数据驱动”，从“事后复盘”转向“实时监测”。
                </span>
              </li>
            </ul>

            <PartnerCtaButton
              className="pde-algorithm-examples__btn"
              onClick={() => navigate('/about')}
            />
          </div>

          <div className="pde-algorithm-examples__right" aria-hidden>
            <div className="pde-algorithm-examples__stack-image pde-algorithm-examples__stack-image--bottom">
              <img src={CASE_IMAGE_BOTTOM} alt="" />
            </div>
            <div className="pde-algorithm-examples__stack-image pde-algorithm-examples__stack-image--middle">
              <img src={CASE_IMAGE_MIDDLE} alt="" />
            </div>
            <div className="pde-algorithm-examples__stack-image pde-algorithm-examples__stack-image--top">
              <img src={CASE_IMAGE_TOP} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdeAlgorithmExamples;
