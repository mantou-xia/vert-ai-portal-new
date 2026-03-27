import React from 'react';
import './HomePage.css';
import HomeVideo from './home/HomeVideo';
import HomeItemShow from './home/HomeItemShow';
import HomeSubjectKeyword from './home/HomeSubjectKeyword';
import HomeData from './home/HomeData';
import HomeCompanyDetail from './home/HomeCompanyDetail';
import { getAssetPath } from '../utils/path';

const HomePage: React.FC = () => {
  return (
    <div
      className="home-page"
      style={
        {
          '--home-bg-chatgpt': `url(${getAssetPath('/images/home/chatgpt.png')})`,
          '--home-bg-keyboard': `url(${getAssetPath('/images/home/keyboard.png')})`,
          '--home-bg-optimization': `url(${getAssetPath('/images/home/optimization.png')})`,
        } as React.CSSProperties
      }
    >
      <section className="hero-section">
        <HomeVideo />
      </section>

      <section className="hero-section">
        <HomeItemShow />
      </section>

      <section className="hero-section">
        <HomeSubjectKeyword />
      </section>

      <section className="hero-section">
        <HomeData />
      </section>

      <section className="hero-section">
        <HomeCompanyDetail />
      </section>
    </div>
  );
};

export default HomePage;
