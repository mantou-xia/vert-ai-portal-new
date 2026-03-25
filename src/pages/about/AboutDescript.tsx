import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutDescript.css';

type AboutItem = {
  label: string;
  value: string;
};

const AboutDescript: React.FC = () => {
  const { t } = useTranslation();
  const columnOneItems = useMemo(
    () => (t('about.descript.columnOneItems', { returnObjects: true }) as AboutItem[]) ?? [],
    [t]
  );

  return (
    <section className="about-descript">
      <div className="about-descript__inner">
        <h2 className="about-descript__title">{t('about.descript.title')}</h2>

        <div className="about-descript__grid">
          <article className="about-descript__col">
            <h3 className="about-descript__col-title">{t('about.descript.col1Title')}</h3>
            <div className="about-descript__divider" />
            <ul className="about-descript__list">
              {columnOneItems.map((item) => (
                <li key={item.label} className="about-descript__item">
                  <span className="about-descript__item-label">{`${item.label}\uFF1A`}</span>
                  <span className="about-descript__item-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="about-descript__col">
            <h3 className="about-descript__col-title">{t('about.descript.col2Title')}</h3>
            <div className="about-descript__divider" />
            <p className="about-descript__text">{t('about.descript.col2Text')}</p>
          </article>

          <article className="about-descript__col">
            <h3 className="about-descript__col-title">{t('about.descript.col3Title')}</h3>
            <div className="about-descript__divider" />
            <p className="about-descript__text">{t('about.descript.col3Text')}</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutDescript;
