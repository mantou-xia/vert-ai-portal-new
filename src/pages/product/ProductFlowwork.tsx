import React, { useState } from 'react';
import CTAButton from '../../components/common/CTAButton';
import { getAssetPath } from '../../utils/path';
import MessageBoard from '../MessageBoard';
import './ProductFlowword.css';

type FlowNode = {
  key: string;
  title: string;
  icon: string;
  className: string;
};

const flowNodes: FlowNode[] = [
  { key: 'setup', title: 'Setup Automation', icon: '/images/icons/product/Frame_63.svg', className: 'product-flowwork__node--setup' },
  { key: 'collect', title: 'Data Collection', icon: '/images/icons/product/Frame.svg', className: 'product-flowwork__node--collect' },
  { key: 'trigger', title: 'Trigger Automation', icon: '/images/icons/product/Frame (1).svg', className: 'product-flowwork__node--trigger' },
  { key: 'direct', title: 'Direct Processing', icon: '/images/icons/product/Frame (2).svg', className: 'product-flowwork__node--direct' },
  { key: 'action', title: 'Action Trigger', icon: '/images/icons/product/Frame (3).svg', className: 'product-flowwork__node--action' },
  { key: 'output', title: 'Output Generation', icon: '/images/icons/product/Vector (1).svg', className: 'product-flowwork__node--output' },
];

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
                <span className="product-flowwork__check" />
                拖拽式 <strong>可视化编排</strong>，无需编写代码
              </li>
              <li>
                <span className="product-flowwork__check" />
                支持 <strong>条件分支、循环</strong> 等复杂逻辑
              </li>
              <li>
                <span className="product-flowwork__check" />
                <strong>实时预览</strong> 执行结果，快速调试
              </li>
              <li>
                <span className="product-flowwork__check" />
                丰富的 <strong>模板库</strong>，一键开始使用
              </li>
            </ul>

            <CTAButton className="product-flowwork__cta" onClick={() => setIsMessageOpen(true)}>
              立即试用
            </CTAButton>
          </div>

          <div className="product-flowwork__right">
            <div className="product-flowwork__canvas-head">
              <span className="product-flowwork__canvas-title">工作流示意图</span>
              <span className="product-flowwork__canvas-running">运行中</span>
              <img src={getAssetPath('/images/icons/product/工作流.png')} alt="" aria-hidden className="product-flowwork__canvas-toolbar" />
            </div>

            <div className="product-flowwork__canvas-map">
              <span className="product-flowwork__line product-flowwork__line--1" />
              <span className="product-flowwork__line product-flowwork__line--2" />
              <span className="product-flowwork__line product-flowwork__line--3" />
              <span className="product-flowwork__line product-flowwork__line--4" />

              {flowNodes.map((node) => (
                <div key={node.key} className={`product-flowwork__node ${node.className}`}>
                  <div className="product-flowwork__node-icon">
                    <img src={getAssetPath(node.icon)} alt="" aria-hidden />
                  </div>
                  <span>{node.title}</span>
                </div>
              ))}

              <div className="product-flowwork__node-subrow">
                <span>Data Validation</span>
                <span>|</span>
                <span>Else</span>
              </div>
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
