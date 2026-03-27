import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from '../../config/routes';
import { getAssetPath } from '../../utils/path';
import './Footer.css';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateWithScrollTop = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const footerNav = useMemo(
    () => [
      { label: t('layout.header.nav.home'), path: routes.home },
      { label: t('layout.header.nav.fde'), path: routes.fde },
      { label: t('layout.header.nav.maas'), path: routes.maas },
      { label: t('layout.header.nav.products'), path: routes.products },
      { label: t('layout.header.nav.about'), path: routes.about },
    ],
    [t]
  );

  return (
    <AntFooter className="app-footer">
      <div className='app-footer__container'>
        <div className="app-footer__inner">
          <header className="app-footer__top">
            <div className="app-footer__logo" onClick={() => navigateWithScrollTop(routes.home)}>
              <img src={getAssetPath('/images/logo/VERT_logo_\u767D\u8272.svg')} alt="" />
              <span>VERT</span>
            </div>
            <nav className="app-footer__nav">
              {footerNav.map((item, index) => (
                <span key={item.path}>
                  {index > 0 && <span className="app-footer__nav-sep">|</span>}
                  <button
                    type="button"
                    className="app-footer__nav-link"
                    onClick={() => navigateWithScrollTop(item.path)}
                  >
                    {item.label}
                  </button>
                </span>
              ))}
            </nav>
          </header>

          <div className="app-footer__middle">
            <div className="app-footer__cta">
              <h2 className="app-footer__cta-title">{t('layout.footer.ctaTitle')}</h2>
              <p className="app-footer__cta-desc">
                {t('layout.footer.ctaDescLine')}
              </p>
            </div>
            <div className="app-footer__contact">
              <div className="app-footer__contact-body">
                <div className="app-footer__qr-wrap">
                  <img
                    className="app-footer__qr-img"
                    src={getAssetPath('/images/icons/home/\u5FAE\u4FE1\u53F7\u4E8C\u7EF4\u7801.png')}
                    alt={t('layout.footer.qrLabel')}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="app-footer__qr-label">{t('layout.footer.qrLabel')}</span>
                </div>
                <div className="app-footer__contact-info">
                  <h3 className="app-footer__contact-title">{t('layout.footer.contactTitle')}</h3>
                  <div className="app-footer__contact-list">
                    <p>{t('layout.footer.phone')}</p>
                    <p>{t('layout.footer.email')}</p>
                    <p>
                      {t('layout.footer.addressLine')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="app-footer__bottom">
            <p className="app-footer__copyright">{t('layout.footer.copyright')}</p>
          </div>
        </div>
      </div>

    </AntFooter>
  );
};

export default Footer;
