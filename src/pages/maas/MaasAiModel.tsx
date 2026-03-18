import React from 'react';
import { getAssetPath } from '../../utils/path';
import './MaasAiModel.css';

const LOGO_ITEMS = [
  { key: 'gpt4', src: '/images/maas/GPT-4.png', alt: 'OpenAI GPT-4', width: 223 },
  { key: 'claude3', src: '/images/maas/Claude.png', alt: 'Claude 3', width: 254 },
  { key: 'deepseek', src: '/images/maas/DeepSeek.png', alt: 'DeepSeek', width: 255 },
  { key: 'qwen', src: '/images/maas/通义千问.png', alt: '通义千问', width: 232 },
  { key: 'gemini', src: '/images/maas/Gemini Pro.png', alt: 'Gemini Pro', width: 245 },
  { key: 'kimi', src: '/images/maas/Kimi.png', alt: 'Kimi', width: 240 },
];

const MaasAiModel: React.FC = () => {
  return (
    <section className="maas-ai-model" aria-label="模型生态 Logo 条">
      <div className="maas-ai-model__inner">
        <div className="maas-ai-model__track" role="list">
          {LOGO_ITEMS.map((item) => (
            <div
              key={item.key}
              className="maas-ai-model__item"
              style={{ '--logo-width': `${item.width}px` } as React.CSSProperties}
              role="listitem"
            >
              <img className="maas-ai-model__logo" src={getAssetPath(item.src)} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaasAiModel;
