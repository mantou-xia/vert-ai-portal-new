import React from 'react';
import { getAssetPath } from '../../utils/path';
import './ProductModel.css';

type ModelItem = {
  name: string;
  capabilities: string[];
  icon: string;
};

const models: ModelItem[] = [
  { name: 'OpenAI GPT-4', capabilities: ['文本生成', '代码辅助', '多模态'], icon: '/images/icons/product/gpt.svg' },
  { name: 'Claude 3', capabilities: ['长文本理解', '分析推理', '创作'], icon: '/images/icons/product/Group_7.svg' },
  { name: 'deepseek', capabilities: ['文本生成', '代码辅助', '多模态'], icon: '/images/icons/product/DeepSeek.svg' },
  { name: '通义千问', capabilities: ['多语言', '多模态', '代码生成'], icon: '/images/icons/product/通义千问.svg' },
  { name: 'Gemini Pro', capabilities: ['推理', '创意', '多模态'], icon: '/images/icons/product/gemini (2).png' },
  { name: 'Kimi', capabilities: ['文本生成', '代码辅助', '多模态'], icon: '/images/icons/product/kimi.svg' },
];

const ProductModel: React.FC = () => {
  return (
    <section className="product-model">
      <div className="product-model__container">
        <header className="product-model__header">
          <h2 className="product-model__title">通用大模型集成能力</h2>
          <p className="product-model__subtitle">支持市场主流大模型快速匹配集成，一键连接顶尖AI能力</p>
        </header>

        <div className="product-model__panel">
          {models.map((model) => (
            <article key={model.name} className="product-model__row">
              <div className="product-model__left">
                <div className="product-model__icon-wrap">
                  <img src={getAssetPath(model.icon)} alt={model.name} className="product-model__icon" loading="lazy" />
                </div>

                <div className="product-model__meta">
                  <h3>{model.name}</h3>
                  <div className="product-model__capabilities">
                    {model.capabilities.map((cap) => (
                      <span key={cap}>{cap}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="product-model__right">
                <div className="product-model__metric">
                  <p className="product-model__metric-value">200ms</p>
                  <p className="product-model__metric-label">延迟</p>
                </div>
                <div className="product-model__metric">
                  <p className="product-model__metric-value">98.5%</p>
                  <p className="product-model__metric-label">准确率</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductModel;
