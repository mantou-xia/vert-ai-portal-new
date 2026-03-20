import React, { useState } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useScrollContext } from '../../contexts/ScrollContext';
import MessageBoard from '../../pages/MessageBoard';
import CTAButton from '../common/CTAButton';
import { getAssetPath } from '../../utils/path';
import './Header.css';

const { Header: AntHeader } = Layout;

type HeaderMenuItem = {
  key: string;
  label: string;
  path: string;
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { videoProgress } = useScrollContext();
  const isHome = location.pathname === '/' || location.pathname === routes.home;
  const showMini = false;
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const headerBgOpacity = isHome ? Math.max(0, 1 - videoProgress * 2.5) : 1;
  const headerStyle =
    isHome && videoProgress > 0.1
      ? {
          background: `rgba(245,245,245,${headerBgOpacity})`,
          borderBottomColor: `rgba(240,240,240,${headerBgOpacity})`,
        }
      : undefined;

  const menuItems: HeaderMenuItem[] = [
    { key: 'home', label: '首页', path: routes.home },
    { key: 'fde-solutions', label: 'FDE解决方案', path: routes.fde },
    { key: 'maas', label: 'MAAS', path: routes.maas },
    { key: 'products', label: '产品', path: routes.products },
    { key: 'about', label: '关于我们', path: routes.about },
  ];

  const selectedMenuKey = menuItems.find((item) => {
    if (item.path === routes.home) {
      return location.pathname === routes.home;
    }
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  })?.key;

  return (
    <>
      <AntHeader className={`app-header ${showMini ? 'app-header--mini' : ''}`} style={headerStyle}>
        <div className="header-content">
          <div className={`header-normal ${showMini ? 'header-normal--hidden' : ''}`}>
            <div className="header-brand" onClick={() => navigate(routes.home)}>
              <img src={getAssetPath('/images/home/logo.png')} alt="VERT" />
            </div>

            <div className="header-center-group">
              <div className="header-nav-pill">
                <nav className="header-menu" aria-label="主导航">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`header-menu-item ${selectedMenuKey === item.key ? 'is-active' : ''}`}
                      onClick={() => navigate(item.path)}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <button type="button" className="header-language-btn" aria-label="语言设置">
                <GlobalOutlined />
              </button>
            </div>

            <div className="header-balance" aria-hidden="true">
              <img src={getAssetPath('/images/home/logo.png')} alt="" />
            </div>
          </div>

          <div className={`header-mini ${showMini ? 'header-mini--visible' : ''}`}>
            <div className="header-mini-pill">
              <div className="header-mini-logo" onClick={() => navigate(routes.home)}>
                <img src={getAssetPath('/images/home/logo.png')} alt="VERT" />
              </div>
              <CTAButton className="header-mini-cta" onClick={() => setIsMessageOpen(true)} />
            </div>
          </div>
        </div>
      </AntHeader>
      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </>
  );
};

export default Header;
