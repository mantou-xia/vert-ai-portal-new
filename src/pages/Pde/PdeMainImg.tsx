import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssetPath } from '../../utils/path';
import './PdeMainImg.css';

const PdeMainImg: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="pde-main-img"
      style={{ backgroundImage: `url(${getAssetPath('/images/home/home-back.png')})` }}
    >
      <div className="pde-main-img__overlay" />
      <div className="pde-main-img__content">
        <h1 className="pde-main-img__title">
          助力企业, 快人一步跨入AI时代
        </h1>
        <p className="pde-main-img__desc">
          VERT深度探索 AI 应用潜能,通过构建稳定的工作流,敏捷开发、迭代和交付切实可用的产品。为中国商业企业与前沿医疗机构提供支撑,赋能实时AI驱动决策;应用场景覆盖从企业管理、生产车间到一线医疗的前沿的全领域。
        </p>
        <button
          type="button"
          className="pde-main-img__btn"
          onClick={() => navigate('/products')}
        >
          立即开始 →
        </button>
      </div>
    </section>
  );
};

export default PdeMainImg;
