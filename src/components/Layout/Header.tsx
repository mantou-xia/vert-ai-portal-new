import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from '../../config/routes';
import MessageBoard from '../../pages/MessageBoard';
import CTAButton from '../common/CTAButton';
import { getAssetPath } from '../../utils/path';
import { useAppLanguage } from '../../hooks/useAppLanguage';
import './Header.css';

const { Header: AntHeader } = Layout;

const ENTER_THRESHOLD = 56;
const EXIT_THRESHOLD = 24;
const DIRECTION_EPSILON = 4;
const SWITCH_TRAVEL_PX = 18;
const SWITCH_LOCK_MS = 320;
const HEADER_LOGO_SRC = '/images/logo/VERT_logo.svg';

type HeaderMenuItem = {
  key: string;
  label: string;
  path: string;
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { language, toggleLanguage } = useAppLanguage();
  const [isMiniHeader, setIsMiniHeader] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const miniStateRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const switchLockUntilRef = useRef(0);
  const directionRef = useRef<0 | 1 | -1>(0);
  const directionTravelRef = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;

    const syncHeaderMode = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;
      const deltaY = currentScrollY - prevScrollY;
      let nextMini = miniStateRef.current;
      const now = window.performance.now();

      if (currentScrollY <= EXIT_THRESHOLD) {
        nextMini = false;
        directionRef.current = 0;
        directionTravelRef.current = 0;
      } else if (now >= switchLockUntilRef.current) {
        if (deltaY > DIRECTION_EPSILON) {
          if (directionRef.current !== 1) {
            directionRef.current = 1;
            directionTravelRef.current = 0;
          }
          directionTravelRef.current += deltaY;
          if (!miniStateRef.current && currentScrollY >= ENTER_THRESHOLD && directionTravelRef.current >= SWITCH_TRAVEL_PX) {
            nextMini = true;
          }
        } else if (deltaY < -DIRECTION_EPSILON) {
          if (directionRef.current !== -1) {
            directionRef.current = -1;
            directionTravelRef.current = 0;
          }
          directionTravelRef.current += -deltaY;
          if (miniStateRef.current && directionTravelRef.current >= SWITCH_TRAVEL_PX) {
            nextMini = false;
          }
        }
      }

      if (miniStateRef.current !== nextMini) {
        miniStateRef.current = nextMini;
        setIsMiniHeader(nextMini);
        switchLockUntilRef.current = now + SWITCH_LOCK_MS;
        directionRef.current = 0;
        directionTravelRef.current = 0;
      }
      lastScrollYRef.current = currentScrollY;
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(syncHeaderMode);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    lastScrollYRef.current = window.scrollY;
    switchLockUntilRef.current = 0;
    directionRef.current = 0;
    directionTravelRef.current = 0;
    syncHeaderMode();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [location.pathname]);

  const menuItems = useMemo<HeaderMenuItem[]>(
    () => [
      { key: 'home', label: t('layout.header.nav.home'), path: routes.home },
      { key: 'fde-solutions', label: t('layout.header.nav.fde'), path: routes.fde },
      { key: 'maas', label: t('layout.header.nav.maas'), path: routes.maas },
      { key: 'products', label: t('layout.header.nav.products'), path: routes.products },
      { key: 'about', label: t('layout.header.nav.about'), path: routes.about },
    ],
    [t]
  );

  const selectedMenuKey = menuItems.find((item) => {
    if (item.path === routes.home) {
      return location.pathname === routes.home;
    }
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  })?.key;

  const languageLabel = language === 'zh-CN' ? t('common.languageCurrentZh') : t('common.languageCurrentEn');

  const navigateWithScrollTop = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <>
      <AntHeader className={`app-header ${isMiniHeader ? 'app-header--mini' : ''}`}>
        <div className="header-content">
          <div className={`header-normal ${isMiniHeader ? 'header-normal--hidden' : ''}`}>
            <div className="header-brand" onClick={() => navigateWithScrollTop(routes.home)}>
              <img className="header-brand-icon" src={getAssetPath(HEADER_LOGO_SRC)} alt="" aria-hidden="true" />
              <span className="header-brand-text">VERT</span>
            </div>

            <div className="header-center-group">
              <div className="header-nav-pill">
                <nav className="header-menu" aria-label={t('layout.header.navAria')}>
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`header-menu-item ${selectedMenuKey === item.key ? 'is-active' : ''}`}
                      onClick={() => navigateWithScrollTop(item.path)}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <button
                type="button"
                className="header-language-btn"
                aria-label={languageLabel}
                onClick={toggleLanguage}
              >
                <span>{languageLabel}</span>
              </button>
            </div>

            <div className="header-balance" aria-hidden="true">
              <img className="header-balance-icon" src={getAssetPath(HEADER_LOGO_SRC)} alt="" />
              <span className="header-balance-text">VERT</span>
            </div>
          </div>

          <div className={`header-mini ${isMiniHeader ? 'header-mini--visible' : ''}`}>
            <div className="header-mini-pill">
              <div className="header-mini-logo" onClick={() => navigateWithScrollTop(routes.home)}>
                <img className="header-mini-logo-icon" src={getAssetPath(HEADER_LOGO_SRC)} alt="" aria-hidden="true" />
                <span className="header-mini-logo-text">VERT</span>
              </div>
              <CTAButton className="header-mini-cta" onClick={() => setIsMessageOpen(true)}>
                {t('layout.header.miniCta')}
              </CTAButton>
            </div>
          </div>
        </div>
      </AntHeader>
      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </>
  );
};

export default Header;
