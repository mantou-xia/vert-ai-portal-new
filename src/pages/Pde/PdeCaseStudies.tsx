import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PartnerCtaButton from '../../components/common/PartnerCtaButton';
import { getAssetPath } from '../../utils/path';
import MessageBoard from '../MessageBoard';
import './PdeCaseStudies.css';

const CASE_IMAGE = getAssetPath('/images/icons/fde/image_\u6570\u5b57\u5458\u5de5.png');

const PdeCaseStudies: React.FC = () => {
  const { t } = useTranslation();
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <section className="pde-case-studies">
      <div className="pde-case-studies__inner">
        <h2 className="pde-case-studies__title">{t('fde.caseStudies.title')}</h2>

        <div className="pde-case-studies__block">
          <div className="pde-case-studies__block-inner">
            <div className="pde-case-studies__left">
              <div className="pde-case-studies__meta">
                <h3 className="pde-case-studies__company">{t('fde.caseStudies.company')}</h3>
                <p className="pde-case-studies__industry">{t('fde.caseStudies.industry')}</p>
              </div>

              <p className="pde-case-studies__intro">{t('fde.caseStudies.intro')}</p>

              <PartnerCtaButton
                className="pde-case-studies__btn"
                onClick={() => setIsMessageOpen(true)}
              />
            </div>

            <div className="pde-case-studies__right" aria-hidden>
              <img className="pde-case-studies__image" src={CASE_IMAGE} alt="" />
            </div>
          </div>
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default PdeCaseStudies;
