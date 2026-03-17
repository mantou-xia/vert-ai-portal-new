import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useScrollContext } from '../../contexts/ScrollContext';
import MessageBoard from '../../pages/MessageBoard';
import CTAButton from '../common/CTAButton';
import './Header.css';
import { getAssetPath } from '../../utils/path';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { videoProgress } = useScrollContext();
  const isHome = location.pathname === '/' || location.pathname === routes.home;
  const showMini = false;
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const headerBgOpacity = isHome ? Math.max(0, 1 - videoProgress * 2.5) : 1;
  const headerStyle = isHome && videoProgress > 0.1
    ? { background: `rgba(245,245,245,${headerBgOpacity})`, borderBottomColor: `rgba(240,240,240,${headerBgOpacity})` }
    : undefined;

  const menuItems = [
    { key: 'home', label: '首页', onClick: () => navigate(routes.home) },
    { key: 'fde-solutions', label: 'FDE解决方案', onClick: () => navigate(routes.fde) },
    { key: 'maas', label: 'MAAS', onClick: () => navigate(routes.maas) },
    { key: 'products', label: '产品', onClick: () => navigate(routes.products) },
    { key: 'about', label: '关于我们', onClick: () => navigate(routes.about) },
  ];

  return (
    <>
      <AntHeader className={`app-header ${showMini ? 'app-header--mini' : ''}`} style={headerStyle}>
        <div className="header-content">
          {/* Normal header: logo on left, nav pill center */}
          <div className={`header-normal ${showMini ? 'header-normal--hidden' : ''}`}>
            <div className="header-logo" onClick={() => navigate(routes.home)}>
              <img src={getAssetPath('/images/home/logo.png')} alt="VERT" />
            </div>
            <div className="header-nav-center">
              <div className="header-nav-pill">
                <Menu
                  mode="horizontal"
                  items={menuItems}
                  className="header-menu"
                  selectedKeys={[]}
                />
              </div>
            </div>
          </div>

          {/* Mini header: centered white pill with logo + CTA */}
          <div className={`header-mini ${showMini ? 'header-mini--visible' : ''}`}>
            <div className="header-mini-pill">
              <div className="header-mini-logo" onClick={() => navigate(routes.home)}>
                <img src={getAssetPath('/images/home/logo.png')} alt="VERT" />
              </div>
              <CTAButton
                className="header-mini-cta"
                onClick={() => setIsMessageOpen(true)}
              />
            </div>
          </div>
        </div>
      </AntHeader>
      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </>
  );
};

export default Header;
