import React, { useState } from 'react';
import MessageBoard from '../MessageBoard';
import PartnerCtaButton from '../../components/common/PartnerCtaButton';
import './PdeCaseStudies.css';

// const CASE_IMAGE_BACK = 'https://www.figma.com/api/mcp/asset/0e3d9e48-e1f0-4f76-acc5-9c43cd7756c5';
// const CASE_IMAGE_MIDDLE = 'https://www.figma.com/api/mcp/asset/f85ff421-f408-4903-be99-4dcd1bc652f8';
// const CASE_IMAGE_FRONT = 'https://www.figma.com/api/mcp/asset/ae55b782-9e5c-465a-9761-1d427c27e3ac';

const PdeCaseStudies: React.FC = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <section className="pde-case-studies">
      <div className="pde-case-studies__inner">
        <h2 className="pde-case-studies__title">企业级AI「数字员工」落地实例</h2>

        <div className="pde-case-studies__block">
          <div className="pde-case-studies__left">
            <div className="pde-case-studies__meta">
              <h3 className="pde-case-studies__company">英唐智控</h3>
              <p className="pde-case-studies__industry">制造业及分销</p>
            </div>

            <p className="pde-case-studies__intro">
              VERT.AI企业级AI数字员工并非单纯“人工替代”，而是通过“异构数据整合、大模型部署、行业算法定制”
              打造数据价值闭环，实现三大升级：
            </p>

            <ul className="pde-case-studies__list">
              <li>
                <span className="pde-case-studies__num">①</span>
                效率升级：核心业务提效50%+，部分场景超100%；
              </li>
              <li>
                <span className="pde-case-studies__num">②</span>
                成本升级：各类成本压降30%-80%，规避合规与决策风险；
              </li>
              <li>
                <span className="pde-case-studies__num">③</span>
                决策升级：从“经验驱动”转向“数据驱动”，从“事后复盘”转向“实时监测”。
              </li>
            </ul>

            <PartnerCtaButton
              className="pde-case-studies__btn"
              onClick={() => setIsMessageOpen(true)}
            />
          </div>

          <div className="pde-case-studies__right" aria-hidden>
            <img className="pde-case-studies__image pde-case-studies__image--back" src="../../../public/images//icons/fde/image_最下层.png" alt="" />
            <img className="pde-case-studies__image pde-case-studies__image--middle" src="../../../public/images//icons/fde/image_中间层.png" alt="" />
            <img className="pde-case-studies__image pde-case-studies__image--front" src="../../../public/images//icons/fde/image_最上层.png" alt="" />
          </div>
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default PdeCaseStudies;
