import React from 'react';
import './ProductMoniter.css';

const summaryStats = [
  { value: '<200ms', label: '平均响应时间' },
  { value: '80%', label: '监控覆盖率' },
  { value: '80%', label: '问题定位速度提升' },
];

const ProductMoniter: React.FC = () => {
  return (
    <section className="product-moniter">
      <div className="product-moniter__container">
        <header className="product-moniter__header">
          <h2 className="product-moniter__title">实时调试预览，支持性能监控</h2>
          <p className="product-moniter__subtitle">实时查看接口调用耗时、错误日志,在线调试参数,快速定位问题</p>
        </header>

        <div className="product-moniter__grid">
          <article className="product-moniter__card product-moniter__card--perf">
            <div className="product-moniter__image-placeholder" role="img" aria-label="实时性能监控图片占位符">
              实时性能监控图片占位符
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--console">
            <div className="product-moniter__image-placeholder" role="img" aria-label="在线调试控制台图片占位符">
              在线调试控制台图片占位符
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--param">
            <div className="product-moniter__image-placeholder" role="img" aria-label="参数在线调试图片占位符">
              参数在线调试图片占位符
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--report">
            <div className="product-moniter__image-placeholder" role="img" aria-label="性能分析报告图片占位符">
              性能分析报告图片占位符
            </div>
          </article>
        </div>

        <div className="product-moniter__stats">
          {summaryStats.map((stat) => (
            <div key={stat.label} className="product-moniter__stat">
              <p className="product-moniter__stat-value">{stat.value}</p>
              <p className="product-moniter__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="product-moniter__divider" />
      </div>
    </section>
  );
};

export default ProductMoniter;
