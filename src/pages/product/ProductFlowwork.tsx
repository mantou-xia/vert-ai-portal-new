import React, { useState } from 'react';
import CTAButton from '../../components/common/CTAButton';
import { getAssetPath } from '../../utils/path';
import MessageBoard from '../MessageBoard';
import './ProductFlowword.css';

const checkIcon = getAssetPath('/images/icons/product/绿色对钩.svg');

const stats = [
  { value: '200+', label: '工作流模板' },
  { value: '100w+', label: '日均执行' },
  { value: '99.9%', label: '成功率' },
];

const ProductFlowwork: React.FC = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <section className="product-flowwork">
      <div className="product-flowwork__container">
        <header className="product-flowwork__header">
          <h2 className="product-flowwork__title">无代码工作流引擎，稳定易用</h2>
          <p className="product-flowwork__subtitle">拖拽式搭建 AI 工作流，可视化配置执行逻辑，降低自动化门槛</p>
        </header>

        <div className="product-flowwork__card">
          <div className="product-flowwork__left">
            <ul className="product-flowwork__features">
              <li>
                <img src={checkIcon} alt="" aria-hidden className="product-flowwork__check-icon" />
                拖拽式<span>可视化编排</span>，无需编写代码
              </li>
              <li>
                <img src={checkIcon} alt="" aria-hidden className="product-flowwork__check-icon" />
                支持<span>条件分支、循环</span>等复杂逻辑
              </li>
              <li>
                <img src={checkIcon} alt="" aria-hidden className="product-flowwork__check-icon" />
                <span>实时预览</span>执行结果，快速调试
              </li>
              <li>
                <img src={checkIcon} alt="" aria-hidden className="product-flowwork__check-icon" />
                丰富的<span>模板库</span>，一键开始使用
              </li>
            </ul>

            <CTAButton className="product-flowwork__cta" onClick={() => setIsMessageOpen(true)}>
              立即试用
            </CTAButton>
          </div>

          <div className="product-flowwork__right">
            <div className="product-flowwork__image-placeholder" role="img" aria-label="工作流示意图图片占位">
              工作流示意图图片占位
            </div>
          </div>
        </div>

        <div className="product-flowwork__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="product-flowwork__stat">
              <p className="product-flowwork__stat-value">{stat.value}</p>
              <p className="product-flowwork__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="product-flowwork__divider" />
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default ProductFlowwork;
