import React, { useState } from 'react';
import MessageBoard from '../MessageBoard';
import ProductFlowG6 from './ProductFlowG6';
import CTAButton from '../../components/common/CTAButton';
import './ProductMainImg.css';

const ProductMainImg: React.FC = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  return (
    <section className="product-main-img">
      <div className="product-main-img__bg" />

      <div className="product-main-img__content">
        <div className="product-main-img__left">
          <p className="product-main-img__eyebrow">VERT 大模型中台</p>
          <h1 className="product-main-img__title">
            企业级一体化智能服务平台
          </h1>
          <p className="product-main-img__subtitle">
            一站式完成大模型集成、管理、多智能 Agent 编排、知识库和 RAG 引擎。智能化工作流编排与
            工具生态连接帮助传统系统升级为 AI 驱动，激活可用的数据资产，全面提升企业 AI 落地效率。
          </p>
          <CTAButton
            className="product-main-img__cta"
            onClick={() => setIsMessageOpen(true)}
          />
          <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
        </div>

        <div className="product-main-img__right">
          <div className="product-main-img__panel">
            <div className="product-main-img__panel-inner">
              <div className="product-main-img__flow">
                <ProductFlowG6 />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-main-img__values">
        <h2 className="product-main-img__values-title">
          五大核心价值，重构企业 AI 开发效率
        </h2>
        <div className="product-main-img__values-inner">
          <div className="product-main-img__value-item">
            <div className="product-main-img__value-icon" />
            <h3 className="product-main-img__value-title">统一管理</h3>
            <p className="product-main-img__value-desc">
              多模型、多工具统一中台管理，方便运维与治理。
            </p>
          </div>
          <div className="product-main-img__value-item">
            <div className="product-main-img__value-icon" />
            <h3 className="product-main-img__value-title">快速构建</h3>
            <p className="product-main-img__value-desc">
              面向业务场景的 Agent 低代码搭建，加速上线。
            </p>
          </div>
          <div className="product-main-img__value-item">
            <div className="product-main-img__value-icon" />
            <h3 className="product-main-img__value-title">知识驱动</h3>
            <p className="product-main-img__value-desc">
              内置知识库与 RAG 能力，让数据真正“会说话”。
            </p>
          </div>
          <div className="product-main-img__value-item">
            <div className="product-main-img__value-icon" />
            <h3 className="product-main-img__value-title">工具生态</h3>
            <p className="product-main-img__value-desc">
              丰富的 API 与工具连接，串联企业现有系统。
            </p>
          </div>
          <div className="product-main-img__value-item">
            <div className="product-main-img__value-icon" />
            <h3 className="product-main-img__value-title">流程编排</h3>
            <p className="product-main-img__value-desc">
              复杂业务流程可视化编排，自动化运行与监控。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMainImg;