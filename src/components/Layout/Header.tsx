import React, { useState } from 'react';
import { Layout, Menu, Button, Dropdown, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined, GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from '../../hooks/useTheme';
import { routes } from '../../config/routes';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useTheme();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const languageMenuItems = [
    {
      key: 'zh-CN',
      label: '简体中文',
      onClick: () => handleLanguageChange('zh-CN'),
    },
    {
      key: 'en-US',
      label: 'English',
      onClick: () => handleLanguageChange('en-US'),
    },
  ];

  const techCenterMenuItems = [
    { key: 'dev-platform', label: '开发者平台' },
    { key: 'enterprise-solution', label: '企业解决方案' },
    { key: 'smart-terminal', label: '智能终端' },
    { key: 'performance-opt', label: '性能优化' },
  ];

  const menuItems = [
    {
      key: 'home',
      label: '首页',
      onClick: () => navigate(routes.home),
    },
    {
      key: 'tech-center',
      label: '技术中心',
      children: techCenterMenuItems,
    },
    {
      key: 'solutions',
      label: '解决方案',
      onClick: () => navigate(routes.solutions),
    },
    {
      key: 'contact',
      label: '联系我们',
      onClick: () => navigate(routes.about),
    },
    {
      key: 'trial',
      label: '立即试用',
      onClick: () => navigate(routes.fde),
    },
  ];

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="header-logo" onClick={() => navigate(routes.home)}>
          <span className="logo-text">VERT.AI</span>
        </div>

        <Menu
          mode="horizontal"
          items={menuItems}
          className="header-menu"
          selectedKeys={[]}
        />

        <Space className="header-actions" size="middle">
          <span className="header-phone">400-880-0750</span>
          
          <Button type="link" onClick={() => navigate('/login')}>
            {i18n.language === 'zh-CN' ? '账号登录' : 'Login'}
          </Button>

          <Button type="primary" onClick={() => navigate(routes.home)}>
            {t('common.freeConsult')}
          </Button>

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
        />
      </div>

      {mobileMenuVisible && (
        <div className="mobile-menu">
          <Menu
            mode="vertical"
            items={menuItems}
            onClick={() => setMobileMenuVisible(false)}
          />
        </div>
      )}
    </AntHeader>
  );
};

export default Header;
