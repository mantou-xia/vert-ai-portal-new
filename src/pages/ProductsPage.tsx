import React from 'react';
import ProductMainImg from './product/ProductMainImg';
import ProductPlugins from './product/ProductPlugins';
import ProductFlowwork from './product/ProductFlowwork';
import ProductMoniter from './product/ProductMoniter';
import ProductModel from './product/ProductModel';

const ProductsPage: React.FC = () => {
  return (
    <div className="fde-page">
      <section className="fde-page__hero">
        <ProductMainImg />
      </section>
      <ProductPlugins />
      <ProductFlowwork />
      <ProductMoniter />
      <ProductModel />
    </div>
  );
};

export default ProductsPage;
