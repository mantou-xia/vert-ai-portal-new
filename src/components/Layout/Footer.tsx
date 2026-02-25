import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { getAssetPath } from '../../utils/path';
import './Footer.css';
import { AppleOutlined, WechatOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleBackTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AntFooter className="app-footer">
      <div className="footer-hero">
        <div className="footer-hero-left">
          <div className="footer-hero-logo">ORTA</div>
          <p className="footer-hero-slogan">AI 科技 · 超越期待</p>

          <div className="footer-hero-social">
            <button className="footer-hero-social-icon footer-hero-social-icon--wechat" >
                <WechatOutlined />
              </button>
            <button className="footer-hero-social-icon" >
            <AppleOutlined />
              </button>
          </div>

          <div className="footer-hero-qr">
            <img
              src={getAssetPath('/public/images/home/qr_code.png')}
              alt="联系二维码"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        <div className="footer-hero-right">
          <div className="footer-hero-column">
            <h4>技术中心</h4>
            <div className="footer-hero-links">
              <button onClick={() => navigate(routes.products)}>开发者平台</button>
              <button onClick={() => navigate(routes.products)}>企业解决方案</button>
              <button onClick={() => navigate(routes.products)}>智能模型</button>
              <button onClick={() => navigate(routes.products)}>性能优化</button>
            </div>
          </div>

          <div className="footer-hero-column">
            <h4>解决方案</h4>
            <div className="footer-hero-links">
              <button onClick={() => navigate(routes.solutions)}>商贸零售业解决方案</button>
              <button onClick={() => navigate(routes.solutions)}>酒店服务业解决方案</button>
              <button onClick={() => navigate(routes.solutions)}>物业管理类解决方案</button>
              <button onClick={() => navigate(routes.solutions)}>制造业解决方案</button>
              <button onClick={() => navigate(routes.solutions)}>行业定制解决方案</button>
            </div>
          </div>
        </div>

        <button className="footer-back-top" onClick={handleBackTop}>
          <span className="footer-back-top-icon" />
        </button>
      </div>
    </AntFooter>
  );
};

export default Footer;
