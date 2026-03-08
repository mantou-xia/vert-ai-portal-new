import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutMainImg.css';

const bgImg = `${import.meta.env.BASE_URL}images/home/home-back.png`;

const AboutMainImg: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="about-main-img" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="about-main-img__overlay" />
      <div className="about-main-img__content">
        <h1 className="about-main-img__title">{t('aboutMain.title')}</h1>
        <p className="about-main-img__desc">{t('aboutMain.description')}</p>
        <button type="button" className="about-main-img__cta">
          {t('aboutMain.cta')} →
        </button>
      </div>
    </section>
  );
};

export default AboutMainImg;
