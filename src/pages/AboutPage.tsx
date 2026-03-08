import React from 'react';
import AboutMainImg from './about/AboutMainImg';
import AboutDescript from './about/AboutDescript';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <section className="fde-page__hero">
        <AboutMainImg />
      </section>
      <AboutDescript />
    </div>
  );
};

export default AboutPage;
