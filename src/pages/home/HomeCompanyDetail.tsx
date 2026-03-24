import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import HomeBrand from './HomeBrand';
import './HomeCompanyDetail.css';

type StatItem = {
  label: string;
  value: string;
};

type CaseItem = {
  id: string;
  image: string;
  companyName: string;
  companyNameEn: string;
  quote: string;
  stats: StatItem[];
};

const CASE_CONFIG = [
  { id: 'yitoa', image: '/images/home/image英唐.png', showStats: true },
  { id: 'yousoft', image: '/images/home/image_优软.png', showStats: false },
  { id: 'aeon', image: '/images/home/image_永旺.png', showStats: false },
  { id: 'daoying', image: '/images/home/image_道影.png', showStats: false },
  { id: 'nuaa', image: '/images/home/image_南航.png', showStats: false },
] as const;

const HomeCompanyDetail: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const primaryStats = useMemo<StatItem[]>(
    () => [
      {
        label: t('home.companyDetail.primaryStats.inputEfficiencyLabel'),
        value: t('home.companyDetail.primaryStats.inputEfficiencyValue'),
      },
      {
        label: t('home.companyDetail.primaryStats.recognitionRateLabel'),
        value: t('home.companyDetail.primaryStats.recognitionRateValue'),
      },
      {
        label: t('home.companyDetail.primaryStats.qaRateLabel'),
        value: t('home.companyDetail.primaryStats.qaRateValue'),
      },
    ],
    [t]
  );

  const caseItems = useMemo<CaseItem[]>(
    () =>
      CASE_CONFIG.map((item) => ({
        id: item.id,
        image: item.image,
        companyName: t(`home.companyDetail.cases.${item.id}.name`),
        companyNameEn: t(`home.companyDetail.cases.${item.id}.nameEn`),
        quote: t(`home.companyDetail.cases.${item.id}.quote`),
        stats: item.showStats ? primaryStats : [],
      })),
    [primaryStats, t]
  );

  const activeItem = caseItems[activeIndex] ?? caseItems[0];

  return (
    <section className="home-company-detail">
      <div className="home-company-detail__inner">
        <header className="home-company-detail__header">
          <h2 className="home-company-detail__title">{t('home.companyDetail.title')}</h2>
        </header>

        <div className="home-company-detail__card">
          <div className="home-company-detail__content">
            <div className="home-company-detail__media">
              <div className="home-company-detail__media-frame">
                <img
                  key={activeItem.id}
                  className="home-company-detail__media-image"
                  src={getAssetPath(activeItem.image)}
                  alt={activeItem.companyName}
                />
              </div>
            </div>

            <div className="home-company-detail__info">
              <div className="home-company-detail__company">
                <h3 className="home-company-detail__company-name">{activeItem.companyName}</h3>
                <span className="home-company-detail__company-en">{activeItem.companyNameEn}</span>
              </div>

              <blockquote className="home-company-detail__quote">{activeItem.quote}</blockquote>

              {activeItem.stats.length > 0 && (
                <>
                  <hr className="home-company-detail__divider" />
                  <div className="home-company-detail__stats">
                    {activeItem.stats.map((stat) => (
                      <div key={`${activeItem.id}-${stat.label}`} className="home-company-detail__stat">
                        <span className="home-company-detail__stat-label">{stat.label}</span>
                        <span className="home-company-detail__stat-value">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="home-company-detail__dots" role="group" aria-label={t('home.companyDetail.switchGroupAria')}>
            {caseItems.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`home-company-detail__dot${index === activeIndex ? ' home-company-detail__dot--active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={t('home.companyDetail.switchToCase', { index: index + 1 })}
              />
            ))}
          </div>
        </div>

        <HomeBrand />
      </div>
    </section>
  );
};

export default HomeCompanyDetail;
