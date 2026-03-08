import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutDescript.css';

const AboutDescript: React.FC = () => {
  const { t } = useTranslation();

  const col1Items = [
    t('aboutDescript.fde'),
    t('aboutDescript.maas'),
    t('aboutDescript.flowAi'),
    t('aboutDescript.insight'),
    t('aboutDescript.core'),
  ];

  return (
    <section className="about-descript">
      <h2 className="about-descript__title">{t('aboutDescript.title')}</h2>

      <div className="about-descript__grid">
        <div className="about-descript__col">
          <h3 className="about-descript__col-title">{t('aboutDescript.col1Title')}</h3>
          <ul className="about-descript__list">
            {col1Items.map((text, i) => (
              <li key={i} className="about-descript__item">
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-descript__col">
          <h3 className="about-descript__col-title">{t('aboutDescript.col2Title')}</h3>
          <p className="about-descript__text">{t('aboutDescript.col2Text')}</p>
        </div>

        <div className="about-descript__col">
          <h3 className="about-descript__col-title">{t('aboutDescript.col3Title')}</h3>
          <p className="about-descript__text">{t('aboutDescript.col3Text')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutDescript;
