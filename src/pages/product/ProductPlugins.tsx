import React from 'react';
import { getAssetPath } from '../../utils/path';
import './ProductPlugins.css';

type PluginNode = {
  key: string;
  label: string;
  className: string;
};

const pluginNodes: PluginNode[] = [
  { key: 'l1', label: 'PDF处理', className: 'product-plugins__node--l1' },
  { key: 'l2', label: 'SearchApi', className: 'product-plugins__node--l2' },
  { key: 'l3', label: 'JSON处理', className: 'product-plugins__node--l3' },
  { key: 'l4', label: 'Chat BI', className: 'product-plugins__node--l4' },
  { key: 'b1', label: 'MCP server', className: 'product-plugins__node--b1 product-plugins__node--lg' },
  { key: 'b2', label: 'OCR识别服务', className: 'product-plugins__node--b2 product-plugins__node--lg' },
  { key: 'b3', label: '企业微信 Bot', className: 'product-plugins__node--b3 product-plugins__node--lg' },
  { key: 'b4', label: 'AgentQL', className: 'product-plugins__node--b4 product-plugins__node--lg' },
  { key: 'r1', label: 'PPT', className: 'product-plugins__node--r1' },
  { key: 'r2', label: 'Discord', className: 'product-plugins__node--r2' },
  { key: 'r3', label: 'Github', className: 'product-plugins__node--r3' },
];

const stats = [
  { value: '200+', label: '插件总数' },
  { value: '100w+', label: '使用次数' },
  { value: '5000+', label: '开发者' },
  { value: '500+', label: '企业用户' },
];

const ProductPlugins: React.FC = () => {
  return (
    <section className="product-plugins">
      <div className="product-plugins__container">
        <header className="product-plugins__header">
          <h2 className="product-plugins__title">海量插件，即插即用</h2>
          <p className="product-plugins__subtitle">覆盖办公、AI能力、数据处理等多场景，无需开发即可集成</p>
        </header>

        <div className="product-plugins__diagram">
          <svg className="product-plugins__lines" viewBox="0 0 1360 560" preserveAspectRatio="none" aria-hidden>
            <path d="M470 242L215 132" />
            <path d="M470 268L177 233" />
            <path d="M470 296L220 352" />
            <path d="M470 323L160 432" />

            <path d="M652 330L560 387" />
            <path d="M652 330L678 390" />
            <path d="M652 330L797 432" />
            <path d="M652 330L913 390" />

            <path d="M896 242L1082 123" />
            <path d="M896 268L1072 235" />
            <path d="M896 296L1083 370" />
          </svg>

          <img
            className="product-plugins__center"
            src={getAssetPath('/images/icons/product/插件中心.svg')}
            alt="插件中心"
            loading="lazy"
          />
          <img
            className="product-plugins__center-icon"
            src={getAssetPath('/images/icons/product/插件中心icon.png')}
            alt=""
            aria-hidden
            loading="lazy"
          />

          {pluginNodes.map((node) => (
            <div key={node.key} className={`product-plugins__node ${node.className}`}>
              <span>{node.label}</span>
            </div>
          ))}
        </div>

        <div className="product-plugins__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="product-plugins__stat">
              <p className="product-plugins__stat-value">{stat.value}</p>
              <p className="product-plugins__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="product-plugins__divider" />
      </div>
    </section>
  );
};

export default ProductPlugins;
