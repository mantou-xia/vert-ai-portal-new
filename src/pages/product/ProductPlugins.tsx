import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProductPlugins.css';

const ProductPlugins: React.FC = () => {
  const { t } = useTranslation();

  const leftPlugins = [
    t('plugins.pdfReader'),
    t('plugins.searchApi'),
    t('plugins.chatAi'),
    t('plugins.soon'),
  ];

  const bottomPlugins = [
    t('plugins.dcpServer'),
    t('plugins.formulaModel'),
    t('plugins.agentSql'),
    t('plugins.privateBot'),
  ];

  const rightPlugins = [
    t('plugins.ppt'),
    t('plugins.shareAi'),
    t('plugins.github'),
  ];

  const stats = [
    { value: '200+', label: t('plugins.statPlugins') },
    { value: '100w+', label: t('plugins.statUsage') },
    { value: '5000+', label: t('plugins.statDevelopers') },
    { value: '500+', label: t('plugins.statEnterprises') },
  ];

  return (
    <section className="product-plugins">
      <div className="product-plugins__header">
        <h2 className="product-plugins__title">{t('plugins.title')}</h2>
        <p className="product-plugins__subtitle">{t('plugins.subtitle')}</p>
      </div>

      <div className="product-plugins__diagram">
        <svg className="product-plugins__lines" viewBox="0 0 600 400" preserveAspectRatio="none">
          {/* 左侧连线 */}
          <line x1="180" y1="200" x2="120" y2="60" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="180" y1="200" x2="120" y2="120" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="180" y1="200" x2="120" y2="200" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="180" y1="200" x2="120" y2="280" stroke="#3b82f6" strokeWidth="1.5" />
          {/* 底部连线 */}
          <line x1="300" y1="280" x2="120" y2="340" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="300" y1="280" x2="240" y2="340" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="300" y1="280" x2="360" y2="340" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="300" y1="280" x2="480" y2="340" stroke="#3b82f6" strokeWidth="1.5" />
          {/* 右侧连线 */}
          <line x1="420" y1="200" x2="480" y2="80" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="420" y1="200" x2="480" y2="200" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="420" y1="200" x2="480" y2="320" stroke="#3b82f6" strokeWidth="1.5" />
        </svg>

        <div className="product-plugins__center">
          <div className="product-plugins__center-icon">Q</div>
          <span className="product-plugins__center-zh">{t('plugins.center')}</span>
          <span className="product-plugins__center-en">{t('plugins.centerEn')}</span>
        </div>

        <div className="product-plugins__nodes product-plugins__nodes--left">
          {leftPlugins.map((name, i) => (
            <div key={i} className="product-plugins__node" style={{ top: `${15 + i * 22}%` }}>
              {name}
            </div>
          ))}
        </div>

        <div className="product-plugins__nodes product-plugins__nodes--bottom">
          {bottomPlugins.map((name, i) => (
            <div key={i} className="product-plugins__node">
              {name}
            </div>
          ))}
        </div>

        <div className="product-plugins__nodes product-plugins__nodes--right">
          {rightPlugins.map((name, i) => (
            <div key={i} className="product-plugins__node" style={{ top: `${20 + i * 30}%` }}>
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="product-plugins__stats">
        {stats.map((stat, i) => (
          <div key={i} className="product-plugins__stat">
            <span className="product-plugins__stat-value">{stat.value}</span>
            <span className="product-plugins__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPlugins;
