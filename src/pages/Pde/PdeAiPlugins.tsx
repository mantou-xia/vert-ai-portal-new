import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './PdeAiPlugins.css';

type TextSegment = {
  text: string;
  strong?: boolean;
};

type PluginCard = {
  key: string;
  title: string;
  subtitle: string;
  cover: string;
  coverOverlay?: boolean;
  coverTextTop: number;
  pain: string;
  painTextWidth: number;
  dividerWidth: number;
  aiTextWidth: number;
  coreValueWidth: number;
  aiService: TextSegment[];
  coreValue: TextSegment[];
};

const PLUGIN_COVER_MAP: Record<string, string> = {
  aeon: getAssetPath('/images/home/image_永旺.png'),
  yijiancai: getAssetPath('/images/home/image_优软.png'),
};

const renderSegments = (segments: TextSegment[]) =>
  segments.map((segment, index) => (
    <span key={`${segment.text}-${index}`} className={segment.strong ? 'is-strong' : ''}>
      {segment.text}
    </span>
  ));

const PdeAiPlugins: React.FC = () => {
  const { t } = useTranslation();
  const plugins = useMemo(
    () =>
      (t('fde.aiPlugins.cards', { returnObjects: true }) as Omit<PluginCard, 'cover'>[]).map((card) => ({
        ...card,
        cover: PLUGIN_COVER_MAP[card.key] ?? PLUGIN_COVER_MAP.aeon,
      })),
    [t]
  );

  return (
    <section className="pde-ai-plugins">
      <div className="pde-ai-plugins__inner">
        <h2 className="pde-ai-plugins__title">{t('fde.aiPlugins.title')}</h2>

        <div className="pde-ai-plugins__grid">
          {plugins.map((card) => (
            <article key={card.key} className={`pde-ai-plugins__card pde-ai-plugins__card--${card.key}`}>
              <div className="pde-ai-plugins__cover-wrap">
                <img className="pde-ai-plugins__cover" src={card.cover} alt="" />
                {card.coverOverlay && <span className="pde-ai-plugins__cover-overlay" aria-hidden />}
                <div className="pde-ai-plugins__cover-text" style={{ top: `${card.coverTextTop}px` }}>
                  <h3 className="pde-ai-plugins__card-title">{card.title}</h3>
                  <p className="pde-ai-plugins__card-subtitle">{card.subtitle}</p>
                </div>
              </div>

              <div className="pde-ai-plugins__content">
                <div className="pde-ai-plugins__pain-row">
                  <span className="pde-ai-plugins__pain-tag">{t('fde.aiPlugins.painTag')}</span>
                  <p className="pde-ai-plugins__pain-text" style={{ maxWidth: `${card.painTextWidth}px` }}>
                    {card.pain}
                  </p>
                </div>

                <div className="pde-ai-plugins__divider" style={{ width: `${card.dividerWidth}px` }} />

                <div className="pde-ai-plugins__cols">
                  <div className="pde-ai-plugins__col">
                    <h4 className="pde-ai-plugins__col-title">{t('fde.aiPlugins.aiServiceTitle')}</h4>
                    <p className="pde-ai-plugins__col-text" style={{ maxWidth: `${card.aiTextWidth}px` }}>
                      {renderSegments(card.aiService)}
                    </p>
                  </div>
                  <div className="pde-ai-plugins__col">
                    <h4 className="pde-ai-plugins__col-title">{t('fde.aiPlugins.coreValueTitle')}</h4>
                    <p className="pde-ai-plugins__col-text" style={{ maxWidth: `${card.coreValueWidth}px` }}>
                      {renderSegments(card.coreValue)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdeAiPlugins;
