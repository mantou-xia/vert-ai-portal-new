import React from 'react';
import { getAssetPath } from '../../utils/path';
import './ProductMoniter.css';

const summaryStats = [
  { value: '<200ms', label: '平均响应时间' },
  { value: '80%', label: '监控覆盖率' },
  { value: '80%', label: '问题定位速度提升' },
];

const tableRows = [
  { time: '2025/05/05 15:15:45', status: 'success', run: '4.285s', token: '1400' },
  { time: '2025/05/03 17:02:33', status: 'success', run: '1.285s', token: '1400' },
  { time: '2025/04/05 09:35:15', status: 'success', run: '2.759s', token: '1400' },
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
            <div className="product-moniter__card-head">
              <h3>实时性能监控</h3>
              <p>监控API响应时间、成功率等关键指标</p>
            </div>

            <div className="product-moniter__perf-metrics">
              <div>
                <p>200ms</p>
                <span>平均响应时间</span>
              </div>
              <div>
                <p>200ms</p>
                <span>平均响应时间</span>
              </div>
              <div>
                <p>99.6%</p>
                <span>成功率</span>
              </div>
            </div>

            <div className="product-moniter__perf-chart">
              <div className="product-moniter__perf-grid" />
              <svg viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden>
                <path d="M0,18 C8,2 16,3 24,11 C32,17 39,6 46,9 C53,12 61,22 67,15 C74,8 81,5 88,12 C93,17 97,15 100,18" />
              </svg>
              <span className="product-moniter__perf-dot" />
              <div className="product-moniter__perf-tooltip">响应时间:150ms</div>
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--console">
            <div className="product-moniter__card-head">
              <h3>在线调试控制台</h3>
              <p>实时查看请求日志、错误堆栈信息</p>
            </div>

            <div className="product-moniter__table">
              <div className="product-moniter__table-head">
                <span>START TIME</span>
                <span>STATUS</span>
                <span>RUN TIME</span>
                <span>TOKEN</span>
              </div>
              {tableRows.map((row) => (
                <div key={row.time} className="product-moniter__table-row">
                  <span>{row.time}</span>
                  <span className="product-moniter__status">{row.status}</span>
                  <span>{row.run}</span>
                  <span>{row.token}</span>
                </div>
              ))}
            </div>

            <div className="product-moniter__log-panel">
              <div className="product-moniter__log-title">Log Detail</div>
              <div className="product-moniter__log-block">
                <p>INPUT</p>
                <code>{'{ "code":0, "msg":"success" }'}</code>
              </div>
              <div className="product-moniter__log-block">
                <p>OUTPUT</p>
                <code>{'{ "content_type":1, "token":1400 }'}</code>
              </div>
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--param">
            <div className="product-moniter__card-head">
              <h3>参数在线调试</h3>
              <p>可视化编辑请求参数，即时预览结果</p>
            </div>

            <div className="product-moniter__param-layout">
              <div className="product-moniter__param-mini">
                <div className="product-moniter__flow-mini-card">
                  <img src={getAssetPath('/images/icons/product/Frame_63.svg')} alt="" aria-hidden />
                  <span>Trigger Automation</span>
                </div>
                <div className="product-moniter__flow-mini-card">
                  <img src={getAssetPath('/images/icons/product/Frame.svg')} alt="" aria-hidden />
                  <span>Action Trigger</span>
                </div>
              </div>

              <div className="product-moniter__param-arrow">→</div>

              <div className="product-moniter__param-panel">
                <div className="product-moniter__flow-mini-card product-moniter__flow-mini-card--strong">
                  <img src={getAssetPath('/images/icons/product/Frame (1).svg')} alt="" aria-hidden />
                  <span>Trigger Automation</span>
                </div>

                <div className="product-moniter__param-group">
                  <h4>input</h4>
                  <p>
                    <span>str</span>
                    <b>text</b>
                  </p>
                  <p>
                    <span>url</span>
                    <b>response_for_model</b>
                  </p>
                </div>

                <div className="product-moniter__param-group">
                  <h4>output</h4>
                  <p>
                    <span>code</span>
                    <b>Number</b>
                  </p>
                  <p>
                    <span>msg</span>
                    <b>String</b>
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--report">
            <div className="product-moniter__card-head">
              <h3>性能分析报告</h3>
              <p>生成详细的性能分析和优化建议</p>
            </div>

            <div className="product-moniter__report-wrap">
              <div className="product-moniter__report-ring product-moniter__report-ring--outer" />
              <div className="product-moniter__report-ring product-moniter__report-ring--mid" />
              <div className="product-moniter__report-ring product-moniter__report-ring--inner" />

              <span className="product-moniter__report-dot product-moniter__report-dot--1" />
              <span className="product-moniter__report-dot product-moniter__report-dot--2" />
              <span className="product-moniter__report-dot product-moniter__report-dot--3" />
              <span className="product-moniter__report-dot product-moniter__report-dot--4" />

              <div className="product-moniter__report-card product-moniter__report-card--left">
                <img src={getAssetPath('/images/icons/product/Group_10.svg')} alt="" aria-hidden />
                <p>AI概览</p>
              </div>
              <div className="product-moniter__report-card product-moniter__report-card--mid">
                <img src={getAssetPath('/images/icons/product/Group_11.svg')} alt="" aria-hidden />
                <p>AI归因</p>
              </div>
              <div className="product-moniter__report-card product-moniter__report-card--right">
                <img src={getAssetPath('/images/icons/product/Group_9.svg')} alt="" aria-hidden />
                <p>AI优化建议</p>
              </div>
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
