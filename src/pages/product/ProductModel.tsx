import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProductModel.css';

const ProductModel: React.FC = () => {
  const { t } = useTranslation();

  const models = [
    { nameKey: 'gpt4', capsKey: 'gpt4Caps', icon: 'G' },
    { nameKey: 'claude', capsKey: 'claudeCaps', icon: 'C' },
    { nameKey: 'deepseek', capsKey: 'deepseekCaps', icon: 'D' },
    { nameKey: 'qianwen', capsKey: 'qianwenCaps', icon: 'Q' },
    { nameKey: 'gemini', capsKey: 'geminiCaps', icon: 'G' },
    { nameKey: 'kimi', capsKey: 'kimiCaps', icon: 'K' },
  ];

  return (
    <section className="product-model">
      <div className="product-model__header">
        <h2 className="product-model__title">{t('model.title')}</h2>
        <p className="product-model__subtitle">{t('model.subtitle')}</p>
      </div>

      <div className="product-model__panel">
        {models.map((m, i) => (
          <div
            key={m.nameKey}
            className={`product-model__row ${i < models.length - 1 ? 'product-model__row--border' : ''}`}
          >
            <div className="product-model__info">
              <div className="product-model__icon">{m.icon}</div>
              <h3 className="product-model__name">{t(`model.${m.nameKey}`)}</h3>
            </div>
            <p className="product-model__desc">{t(`model.${m.capsKey}`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductModel;
