import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MessageBoard from '../MessageBoard';
import CTAButton from '../../components/common/CTAButton';
import { getAssetPath } from '../../utils/path';
import './PdeMainImg.css';

const PdeMainImg: React.FC = () => {
  const { t } = useTranslation();
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <section
      className="pde-main-img"
      style={{ backgroundImage: `url(${getAssetPath('/images/icons/fde/fde-back.png')})` }}
    >
      <div className="pde-main-img__overlay" />
      <div className="pde-main-img__content">
        <p className="pde-main-img__title">{t('fde.main.title')}</p>
        <p className="pde-main-img__desc">
          {t('fde.main.desc')}
        </p>
        <CTAButton
          className="pde-main-img__btn"
          onClick={() => setIsMessageOpen(true)}
        />
      </div>
      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default PdeMainImg;
