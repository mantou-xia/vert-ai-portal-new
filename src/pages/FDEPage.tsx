import React from 'react';
import './FDEPage.css';
import PdeMainImg from './Pde/PdeMainImg';
import PdeSolution from './Pde/PdeSolution';
import PdeCaseStudies from './Pde/PdeCaseStudies';
import PdeStudiesDetail from './Pde/PdeStudiesDetail';
import PdeAiPlugins from './Pde/PdeAiPlugins';
import HomeBrand from './home/HomeBrand';

const FDEPage: React.FC = () => {
  return (
    <div className="fde-page">
      <section className="fde-page__hero">
        <PdeMainImg />
      </section>
      <section className="fde-page__hero">
        <HomeBrand />
      </section>
      <section className="fde-page__section">
        <PdeSolution />
      </section>
      <section className="fde-page__section">
        <PdeCaseStudies />
      </section>
      <section className="fde-page__section">
        <PdeStudiesDetail />
      </section>
      <section className="fde-page__section">
        <PdeAiPlugins />
      </section>

    </div>
  );
};

export default FDEPage;
