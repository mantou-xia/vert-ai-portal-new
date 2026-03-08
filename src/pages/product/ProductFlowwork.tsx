import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProductFlowword.css';

const ProductFlowwork: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    t('workflow.feature1'),
    t('workflow.feature2'),
    t('workflow.feature3'),
    t('workflow.feature4'),
  ];

  const stats = [
    { value: '200+', label: t('workflow.statTemplates') },
    { value: '100w+', label: t('workflow.statDaily') },
    { value: '99.9%', label: t('workflow.statSuccess') },
  ];

  return (
    <section className="product-flowwork">
      <div className="product-flowwork__header">
        <h2 className="product-flowwork__title">{t('workflow.title')}</h2>
        <p className="product-flowwork__subtitle">{t('workflow.subtitle')}</p>
      </div>

      <div className="product-flowwork__card">
        <div className="product-flowwork__left">
          <ul className="product-flowwork__features">
            {features.map((text, i) => (
              <li key={i} className="product-flowwork__feature">
                <span className="product-flowwork__check" />
                {text}
              </li>
            ))}
          </ul>
          <button type="button" className="product-flowwork__cta">
            {t('workflow.cta')} →
          </button>
        </div>

        <div className="product-flowwork__right">
          <img
            src={`${import.meta.env.BASE_URL}images/home/keyboard.png`}
            alt="工作流"
            className="product-flowwork__img"
          />
        </div>
      </div>

      <div className="product-flowwork__stats">
        {stats.map((stat, i) => (
          <div key={i} className="product-flowwork__stat">
            <span className="product-flowwork__stat-value">{stat.value}</span>
            <span className="product-flowwork__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductFlowwork;
