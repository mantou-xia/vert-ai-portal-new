import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'home',
      label: '首页',
      onClick: () => navigate(routes.home),
    },
    {
      key: 'fde-solutions',
      label: 'FDE解决方案',
      onClick: () => navigate(routes.fde),
    },
    {
      key: 'maas',
      label: 'MAAS',
      onClick: () => navigate(routes.solutions),
    },
    {
      key: 'products',
      label: '产品',
      onClick: () => navigate(routes.products),
    },
    {
      key: 'about',
      label: '关于我们',
      onClick: () => navigate(routes.about),
    },
  ];

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="header-logo" onClick={() => navigate(routes.home)}>
          <span className="logo-text">
            <img src="/images/home/logo.png" alt="VERT" />
          </span>
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

        {/* <Space className="header-actions" size="middle">
          <Dropdown menu={{ items: languageMenuItems }} placement="bottomRight">
            <Button icon={<GlobalOutlined />} type="text" />
          </Dropdown>

          <Button
            icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}
            type="text"
          />
        </Space>

        <Button
          className="mobile-menu-btn"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
          type="text"
        /> */}
      </div>

      {/* {mobileMenuVisible && (
        <div className="mobile-menu">
          <Menu
            mode="vertical"
            items={menuItems}
            onClick={() => setMobileMenuVisible(false)}
          />
        </div>
      )} */}
    </AntHeader>
  );
};

export default Header;
