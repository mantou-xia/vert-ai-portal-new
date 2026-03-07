import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { getAssetPath } from '../../utils/path';
import './Footer.css';

const { Footer: AntFooter } = Layout;

const FOOTER_NAV = [
  { label: '首页', path: routes.home },
  { label: 'FDE解决方案', path: routes.fde },
  { label: 'MAAS', path: routes.solutions },
  { label: '产品', path: routes.products },
  { label: '关于我们', path: routes.about },
] as const;

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AntFooter className="app-footer">
      <div className="app-footer__inner">
        <header className="app-footer__top">
          <div className="app-footer__logo" onClick={() => navigate(routes.home)}>
            <img src={getAssetPath('/images/home/logo_write.png')} alt="" />
          </div>
          <nav className="app-footer__nav">
            {FOOTER_NAV.map((item, index) => (
              <span key={item.path}>
                {index > 0 && <span className="app-footer__nav-sep">|</span>}
                <button
                  type="button"
                  className="app-footer__nav-link"
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              </span>
            ))}
          </nav>
        </header>

        <div className="app-footer__middle">
          <div className="app-footer__cta">
            <h2 className="app-footer__cta-title">
              准备好迎接下一代AI应用了吗?
            </h2>
            <p className="app-footer__cta-desc">
              集RAG pipeline、丰富的集成和全面可观测性于一体,
              轻松上线可投产的AI Agents, 无需繁琐操作。
            </p>
          </div>
          <div className="app-footer__contact">
            <div className="app-footer__contact-body">
              <div className="app-footer__qr-wrap">
                <img
                  className="app-footer__qr-img"
                  src={getAssetPath('/images/home/qr_code.png')}
                  alt="微信号"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="app-footer__qr-label">微信号</span>
              </div>
              <div className="app-footer__contact-info">
                <h3 className="app-footer__contact-title">联系我们</h3>
                <div className="app-footer__contact-list">
                  <p>联系电话: 18751969612</p>
                  <p>邮箱地址: m278398343@163.com</p>
                  <p>
                    公司地址: 深圳市宝安区新安街道海旺社区宝兴路6号
                    海纳百川总部大厦B座6层
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="app-footer__bottom">
          <p className="app-footer__copyright">
            © 2025 Breakthrough Energy, LLC. All Rights Reserved
          </p>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
