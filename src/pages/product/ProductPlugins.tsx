import React from 'react';
import { getAssetPath } from '../../utils/path';
import './ProductPlugins.css';

type PluginNodeSize = 'sm' | 'md';

type PluginNode = {
  key: string;
  label: string;
  size: PluginNodeSize;
  x: number;
  y: number;
  width: number;
  height: number;
  labelDx?: number;
  labelDy?: number;
  labelFontSize?: number;
  cardDx?: number;
  cardDy?: number;
  cardScale?: number;
  layer?: 'default' | 'under-center';
  compactOnTablet?: boolean;
  compactOnMobile?: boolean;
};

const pluginNodes: PluginNode[] = [
  {
    key: 'left-pdf',
    label: 'PDF处理',
    size: 'sm',
    x: 211.781,
    y: 98.059,
    width: 111.32,
    height: 65.927,
    labelDx: -1,
    labelFontSize: 11.606,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
  },
  {
    key: 'left-searchapi',
    label: 'SearchApi',
    size: 'sm',
    x: 167.065,
    y: 202.696,
    width: 111.32,
    height: 65.927,
    labelDx: -1,
    labelFontSize: 11.606,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
  },
  {
    key: 'left-json',
    label: 'JSON处理',
    size: 'sm',
    x: 374.549,
    y: 117.735,
    width: 111.32,
    height: 65.927,
    labelFontSize: 11.606,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
  },
  {
    key: 'left-chatbi',
    label: 'Chat BI',
    size: 'sm',
    x: 108.039,
    y: 293.918,
    width: 111.32,
    height: 65.927,
    labelDy: 1,
    labelFontSize: 11.606,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
    compactOnMobile: true,
  },
  {
    key: 'bottom-mcp',
    label: 'MCP server',
    size: 'md',
    x: 525.543,
    y: 313.817,
    width: 166.113,
    height: 98.376,
    labelFontSize: 12.521,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
    layer: 'under-center',
    compactOnTablet: true,
  },
  {
    key: 'bottom-ocr',
    label: 'OCR识别服务',
    size: 'md',
    x: 642.7,
    y: 276.255,
    width: 166.113,
    height: 98.376,
    labelFontSize: 12.521,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
    layer: 'under-center',
    compactOnTablet: true,
  },
  {
    key: 'bottom-wecom',
    label: '企业微信 Bot',
    size: 'md',
    x: 610.504,
    y: 391.624,
    width: 166.113,
    height: 98.376,
    labelFontSize: 12.521,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
    layer: 'under-center',
    compactOnTablet: true,
  },
  {
    key: 'bottom-agentql',
    label: 'AgentQL',
    size: 'md',
    x: 727.661,
    y: 354.062,
    width: 166.113,
    height: 98.376,
    labelFontSize: 12.521,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
    layer: 'under-center',
    compactOnTablet: true,
    compactOnMobile: true,
  },
  {
    key: 'right-ppt',
    label: 'PPT',
    size: 'sm',
    x: 1135.275,
    y: 183.133,
    width: 111.32,
    height: 65.927,
    labelFontSize: 11.606,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
  },
  {
    key: 'right-discord',
    label: 'Discord',
    size: 'sm',
    x: 994.865,
    y: 303.867,
    width: 111.32,
    height: 65.927,
    labelFontSize: 11.606,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
  },
  {
    key: 'right-github',
    label: 'GitHub',
    size: 'sm',
    x: 1140.641,
    y: 326.225,
    width: 111.32,
    height: 65.927,
    labelFontSize: 11.606,
    cardDx: 0,
    cardDy: -2,
    cardScale: 1,
  },
];

const stats = [
  { value: '200+', label: '插件总数' },
  { value: '100w+', label: '使用次数' },
  { value: '5000+', label: '开发者' },
  { value: '500+', label: '企业用户' },
];

type Connector = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  viewBox: string;
  d: string;
  gradientX1: number;
  gradientY1: number;
  gradientX2: number;
  gradientY2: number;
};

const connectors: Connector[] = [
  {
    key: 'left-pdf',
    x: 277.962,
    y: 143.67,
    width: 338.057,
    height: 158.744,
    viewBox: '0 0 340 160',
    d: 'M0.894 0.894L176.817 156.249C179.194 158.348 182.507 159.031 185.521 158.044L338.951 107.767',
    gradientX1: 22.3895,
    gradientY1: 42.5889,
    gradientX2: 331.705,
    gradientY2: 41.6745,
  },
  {
    key: 'left-json',
    x: 449.673,
    y: 167.817,
    width: 148.906,
    height: 87.644,
    viewBox: '0 0 151 89',
    d: 'M0.894531 0.894531L99.3999 85.2048C101.813 87.2699 105.14 87.9005 108.141 86.8617L149.801 72.441',
    gradientX1: 10.3626,
    gradientY1: 23.9145,
    gradientX2: 146.609,
    gradientY2: 23.5932,
  },
  {
    key: 'left-search',
    x: 231.009,
    y: 246.071,
    width: 394.4,
    height: 110.45,
    viewBox: '0 0 397 112',
    d: 'M0.894531 0.894531L124.486 108.007C126.873 110.076 130.174 110.732 133.171 109.733L395.294 22.3585',
    gradientX1: 25.972,
    gradientY1: 29.9044,
    gradientX2: 386.834,
    gradientY2: 28.1157,
  },
  {
    key: 'left-chat',
    x: 176.455,
    y: 332.374,
    width: 152.483,
    height: 42.481,
    viewBox: '0 0 155 44',
    d: 'M0.894287 12.5208L34.0423 40.0776C36.4972 42.1184 39.8539 42.6959 42.8497 41.5928L153.378 0.894531',
    gradientX1: 10.5898,
    gradientY1: 12.0522,
    gradientX2: 150.107,
    gradientY2: 11.357,
  },
  {
    key: 'right-ppt',
    x: 780.884,
    y: 85.143,
    width: 409.156,
    height: 131.019,
    viewBox: '0 0 411 132',
    d: 'M410.051 130.954L264.769 3.12336C262.507 1.13326 259.395 0.415648 256.49 1.21424L0.894522 71.4811',
    gradientX1: 384.035,
    gradientY1: 96.5416,
    gradientX2: 9.66878,
    gradientY2: 98.1644,
  },
  {
    key: 'right-github',
    x: 778.137,
    y: 115.6,
    width: 417.269,
    height: 243.767,
    viewBox: '0 0 420 245',
    d: 'M418.164 243.589L168.765839 24.163016C166.450839 22.031416 163.186839 21.273236 160.168839 22.166566L0.894721 68.9856',
    gradientX1: 391.632,
    gradientY1: 179.563,
    gradientX2: 9.83792,
    gradientY2: 180.47,
  },
  {
    key: 'right-discord',
    x: 774.57,
    y: 173.123,
    width: 275.061,
    height: 163.942,
    viewBox: '0 0 277 165',
    d: 'M275.955 163.708L107.964 3.36878C105.632 1.14256 102.282 0.344221 99.196 1.2793L0.894473 31.0676',
    gradientX1: 258.466,
    gradientY1: 120.648,
    gradientX2: 6.78971,
    gradientY2: 121.234,
  },
];

type CSSVarStyle = React.CSSProperties & Record<`--${string}`, string>;

const ProductPlugins: React.FC = () => {
  return (
    <section className="product-plugins">
      <div className="product-plugins__container">
        <header className="product-plugins__header">
          <h2 className="product-plugins__title">海量插件，即插即用</h2>
          <p className="product-plugins__subtitle">覆盖办公、AI能力、数据处理等多场景，无需开发即可集成</p>
        </header>

        <div className="product-plugins__diagram" aria-label="插件关系图">
          <div className="product-plugins__lines" aria-hidden>
            {connectors.map((connector) => {
              const gradientId = `product-plugins-line-${connector.key}`;
              return (
                <svg
                  key={connector.key}
                  className="product-plugins__connector"
                  style={
                    {
                      '--line-x': `${connector.x}`,
                      '--line-y': `${connector.y}`,
                      '--line-w': `${connector.width}`,
                      '--line-h': `${connector.height}`,
                    } as CSSVarStyle
                  }
                  viewBox={connector.viewBox}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id={gradientId}
                      x1={connector.gradientX1}
                      y1={connector.gradientY1}
                      x2={connector.gradientX2}
                      y2={connector.gradientY2}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#4541F0" stopOpacity="0.3" />
                      <stop offset="0.160633" stopColor="#4541F0" stopOpacity="0.3" />
                      <stop offset="0.185001" stopColor="#4541F0" stopOpacity="0.5" />
                      <stop offset="0.2446" stopColor="#4541F0" stopOpacity="0.8" />
                      <stop offset="0.260857" stopColor="#4541F0" stopOpacity="0.3" />
                      <stop offset="0.682423" stopColor="#4541F0" stopOpacity="0.4" />
                      <stop offset="0.749239" stopColor="#4541F0" stopOpacity="0.5" />
                      <stop offset="0.813315" stopColor="#4541F0" stopOpacity="0.8" />
                      <stop offset="1" stopColor="#4541F0" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path d={connector.d} stroke={`url(#${gradientId})`} strokeWidth="1.78866" strokeLinecap="round" fill="none" />
                </svg>
              );
            })}
          </div>

          <img
            className="product-plugins__center-base"
            src={getAssetPath('/images/icons/product/插件中心.svg')}
            alt="插件中心"
            loading="lazy"
          />
          <div className="product-plugins__center-top-group" aria-hidden>
            <div className="product-plugins__center-top-card-shell">
              <div className="product-plugins__center-top-card" />
            </div>
            <img className="product-plugins__center-top-icon" src={getAssetPath('/images/icons/product/插件中心icon.png')} alt="" loading="lazy" />
            <div className="product-plugins__center-top-title-wrap">
              <p className="product-plugins__center-top-title">插件中心</p>
            </div>
            <div className="product-plugins__center-top-subtitle-wrap">
              <p className="product-plugins__center-top-subtitle">Plugin Center</p>
            </div>
          </div>

          {pluginNodes.map((node) => (
            <div
              key={node.key}
              className={`product-plugins__node product-plugins__node--${node.size}${node.layer === 'under-center' ? ' product-plugins__node--under-center' : ''}${node.compactOnTablet ? ' product-plugins__node--compact-tablet' : ''}${node.compactOnMobile ? ' product-plugins__node--compact-mobile' : ''}`}
              style={
                {
                  '--node-x': `${node.x}`,
                  '--node-y': `${node.y}`,
                  '--node-w': `${node.width}`,
                  '--node-h': `${node.height}`,
                  '--label-dx': `${node.labelDx ?? 0}px`,
                  '--label-dy': `${node.labelDy ?? 0}px`,
                  '--label-font-size': `${node.labelFontSize ?? 11.606}px`,
                  '--card-dx': `${node.cardDx ?? 0}px`,
                  '--card-dy': `${node.cardDy ?? 0}px`,
                  '--card-scale': `${node.cardScale ?? 1}`,
                } as CSSVarStyle
              }
            >
              <img
                className="product-plugins__node-plate"
                src={getAssetPath(
                  node.size === 'md' ? '/images/icons/product/中型插件中心.svg' : '/images/icons/product/小型插件中心.svg'
                )}
                alt=""
                aria-hidden
                loading="lazy"
              />
              <div className="product-plugins__node-top-card" aria-hidden>
                <span className="product-plugins__node-top-label">{node.label}</span>
              </div>
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
