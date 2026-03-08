import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProductMoniter.css';

const keyboardImg = `${import.meta.env.BASE_URL}images/home/keyboard.png`;

const ProductMoniter: React.FC = () => {
  const { t } = useTranslation();

  const cards = [
    { title: t('monitor.card1Title'), desc: t('monitor.card1Desc') },
    { title: t('monitor.card2Title'), desc: t('monitor.card2Desc') },
    { title: t('monitor.card3Title'), desc: t('monitor.card3Desc') },
    { title: t('monitor.card4Title'), desc: t('monitor.card4Desc') },
  ];

  const stats = [
    { value: '<200ms', label: t('monitor.statResponse') },
    { value: '80%', label: t('monitor.statCoverage') },
    { value: '80%', label: t('monitor.statLocate') },
  ];

  return (
    <section className="product-moniter">
      <div className="product-moniter__header">
        <h2 className="product-moniter__title">{t('monitor.title')}</h2>
        <p className="product-moniter__subtitle">{t('monitor.subtitle')}</p>
      </div>

      <div className="product-moniter__grid">
        {cards.map((card, i) => (
          <div key={i} className="product-moniter__card">
            <h3 className="product-moniter__card-title">{card.title}</h3>
            <p className="product-moniter__card-desc">{card.desc}</p>
            <div className="product-moniter__card-body">
              <img src={keyboardImg} alt="" className="product-moniter__card-img" />
            </div>
          </div>
        ))}
      </div>

      <div className="product-moniter__stats">
        {stats.map((stat, i) => (
          <div key={i} className="product-moniter__stat">
            <span className="product-moniter__stat-value">{stat.value}</span>
            <span className="product-moniter__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductMoniter;
