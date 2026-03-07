import React from 'react';
import './HomePage.css';
import HomeVideo from './home/HomeVideo';
import HomeItemShow from './home/HomeItemShow';
import HomeSubjectKeyword from './home/HomeSubjectKeyword';
import HomeData from './home/HomeData';
import HomeCompanyDetail from './home/HomeCompanyDetail';
import HomeBrand from './home/HomeBrand';
const HomePage: React.FC = () => {

  return (
    <div className="home-page">
      {/* Hero */}
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
      <section className="hero-section">
        <HomeBrand />
      </section>
    </div>
  );
};
export default HomePage;
