import React, { useState } from 'react';
import './HomePage.css';
import { ArrowRightOutlined, EnterOutlined, RightOutlined, ToolOutlined, WindowsOutlined, ZoomInOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  const [activeSolutionId, setActiveSolutionId] = useState(solutions[0].id);
  const activeSolution = solutions.find((item) => item.id === activeSolutionId)!;

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-background" />
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              赋能全行业 AI 升级，为企业、开发者、初创公司提供定制化智能解决方案
            </h1>
            <button className="pill-button hero-button">
              <span>解决方案</span>
              <span className="pill-icon"><ArrowRightOutlined /></span>
            </button>
          </div>
          <div className="hero-steps">
            <div className="hero-step hero-step--muted" />
            <div className="hero-step hero-step--active">
              <span className="hero-step-dot" />
            </div>
            <div className="hero-step hero-step--muted" />
            <div className="hero-step hero-step--muted" />
          </div>
        </div>
      </section>

      {/* 核心技术 */}
      <section className="section section-dark core-section">
        <div className="section-inner">
          <header className="section-header">
            <h2 className="section-title">核心技术</h2>
            <p className="section-subtitle">
              让 AI 建设更高效，针对不同用户群体，提供全栈式 AI 技术支持与服务
            </p>
          </header>

          <div className="core-carousel">
            <CoreCarousel />
          </div>
        </div>
      </section>

      {/* 行业解决方案列表 */}
      <section className="section section-dark industries-section">
        <div className="section-inner">
          <header className="section-header">
            <h2 className="section-title">行业解决方案</h2>
            <p className="section-subtitle">
              深入各行业场景，提供定制化 AI 解决方案
            </p>
          </header>

          <div className="industries-list">
            <div className="industry-column">
              <button className="industry-item industry-item--active">
                <span className="industry-item-label">商贸零售行业</span>
                <span className="industry-item-icon">
                  <ArrowRightOutlined />
                </span>
              </button>
              <button className="industry-item">
                <span className="industry-item-label">物业管理类</span>
                <span className="industry-item-icon">
                  <ArrowRightOutlined />
                </span>
              </button>
            </div>
            <div className="industry-column">
              <button className="industry-item">
                <span className="industry-item-label">酒店服务业</span>
                <span className="industry-item-icon">
                  <ArrowRightOutlined />
                </span>
              </button>
              <button className="industry-item">
                <span className="industry-item-label">制造业</span>
                <span className="industry-item-icon">
                  <ArrowRightOutlined />
                </span>
              </button>
            </div>
          </div>

          <div className="industries-cta">
            <h3>行业定制解决方案</h3>
            <p>特定行业方案，可联系我们定制</p>
            <button className="pill-button">
              <span>联系我们</span>
              <span className="pill-icon" />
            </button>
          </div>

          <div className="partners-strip">
            <div className="partner-pill" />
            <div className="partner-pill" />
            <div className="partner-pill" />
            <div className="partner-pill" />
          </div>
        </div>
      </section>

      {/* 解决方案拆解（示例一块） */}
      <section className="section solutions-section">
        <div className="solutions-layout">
          <aside className="solutions-sidebar">
            <div className="solutions-sidebar-title">
              <span className="solutions-dot" />
              <span>项目展示</span>
            </div>
            <nav className="solutions-nav">
              {solutions.map((solution) => (
                <button
                  key={solution.id}
                  className={`solutions-nav-item ${
                    solution.id === activeSolutionId ? 'solutions-nav-item--active' : ''
                  }`}
                  onClick={() => setActiveSolutionId(solution.id)}
                >
                  {solution.navLabel}
                </button>
              ))}
            </nav>
          </aside>

          <div className="solutions-content">
            <article className="solution-card">
              <header className="solution-card-header">
                <div className="solution-card-title">
                  <span className="solution-icon" />
                  <div>
                    <h3>{activeSolution.title}</h3>
                    <p>{activeSolution.subtitle}</p>
                  </div>
                </div>
              </header>

              <div className="solution-card-body">
                <div className="solution-main-media">
                  <div className="solution-main-image-wrapper">
                    <img
                      src={activeSolution.imageSrc}
                      alt={`${activeSolution.title} 项目展示`}
                      className="solution-main-image"
                    />
                  </div>
                  <div className="solution-main-mask" />
                  <div className="solution-main-bottom">
                    <span className="solution-main-icon" />
                    <span className="solution-main-label">{activeSolution.bottomLabel}</span>
                  </div>
                </div>
              </div>

              <footer className="solution-card-footer">
                <div className="solution-result">
                  <span className="solution-result-line" />
                  <span>{activeSolution.resultText}</span>
                  <span className="solution-result-icon" />
                </div>
                <button className="solution-more">
                  <span className="solution-more-icon" />
                </button>
              </footer>
            </article>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="section contact-section">
        <div className="contact-inner">
          <header className="contact-header">
            <h2>联系我们</h2>
            <p>开启 AI 合作之旅</p>
          </header>

          <div className="contact-grid">
            <div className="contact-card contact-card--light">
              <div className="contact-card-main">
                <div className="contact-icon" />
                <span className="contact-label">商务咨询</span>
              </div>
              <span className="contact-value">400-888-8888</span>
            </div>
            <div className="contact-card">
              <div className="contact-card-main">
                <div className="contact-icon" />
                <span className="contact-label">商务邮箱</span>
              </div>
              <span className="contact-value">business@orta-ai.com</span>
            </div>
            <div className="contact-card">
              <div className="contact-card-main">
                <div className="contact-icon" />
                <span className="contact-label">技术支持</span>
              </div>
              <span className="contact-value">support@orta-ai.com</span>
            </div>
            <div className="contact-card">
              <div className="contact-card-main">
                <div className="contact-icon" />
                <span className="contact-label">公司地址</span>
              </div>
              <span className="contact-value">
                南京市建邺区应天大街888号A座17F
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

type Solution = {
  id: string;
  navLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  bottomLabel: string;
  resultText: string;
};

const solutions: Solution[] = [
  {
    id: 'retail',
    navLabel: '商贸零售行业解决方案',
    title: '商贸零售行业',
    subtitle: '行业痛点：多元化业务系统复杂，客户画像模糊，营销投放效果不显著',
    imageSrc: '/images/home/image1.png',
    bottomLabel: 'AI 经营分析平台',
    resultText: '某连锁零售品牌通过 ORTA AI，库存周转率提升 35%',
  },
  {
    id: 'hotel',
    navLabel: '酒店服务业解决方案',
    title: '酒店服务业',
    subtitle: '行业痛点：会员运营效率低，服务流程标准化不足，线上线下数据割裂',
    imageSrc: '/images/home/image2.png',
    bottomLabel: '智能酒店运营中台',
    resultText: '某头部酒店集团借助 ORTA AI，实现入住体验满意度提升 28%',
  },
  {
    id: 'property',
    navLabel: '物业管理类解决方案',
    title: '物业管理类',
    subtitle: '行业痛点：工单分配低效，安全巡检依赖人工，投诉问题闭环慢',
    imageSrc: '/images/home/image3.png',
    bottomLabel: 'AI 物业智能管控平台',
    resultText: '某大型园区通过 ORTA AI，物业报修响应时间缩短 40%',
  },
  {
    id: 'manufacturing',
    navLabel: '制造业解决方案',
    title: '制造业',
    subtitle: '行业痛点：产线数据分散，质量问题追溯难，设备维护成本高',
    imageSrc: '/images/home/image4.png',
    bottomLabel: '智能制造可视化驾驶舱',
    resultText: '某制造企业利用 ORTA AI，将设备停机率降低 22%',
  },
] as const;

const coreSlides = [
  {
    id: 'dev-platform',
    title: '开发者平台',
    subtitle: '零代码 / 低代码快速搭建 AI 流程',
    mediaClass: 'core-card-media--dev',
    features: [
      {
        icon: <EnterOutlined />,
        title: '工作流构建器',
        desc: '拖拽式操作，零代码 / 低代码快速搭建 AI 流程',
      },
      {
        icon: <WindowsOutlined />,
        title: '插件应用市场',
        desc: '海量第三方插件，灵活扩展功能边界',
      },
      {
        icon: <ZoomInOutlined />,
        title: '实时调试预览',
        desc: '即时查看效果，快速迭代优化',
      },
      {
        icon: <ToolOutlined />,
        title: '丰富 MCP 工具',
        desc: '覆盖模型训练、数据处理、部署运维全流程',
      },
    ],
  },
  {
    id: 'models',
    title: '智能模型',
    subtitle: '支持文本、图像、语音等多模态理解',
    mediaClass: 'core-card-media--models',
    features: [
      {
        icon: <EnterOutlined />,
        title: '主流 LLM 接入',
        desc: '支持 GPT-4、Claude、DeepSeek 等主流大模型',
      },
      {
        icon: <WindowsOutlined />,
        title: '多模态处理',
        desc: '文本、图片、语音一体化理解与生成能力',
      },
      {
        icon: <ZoomInOutlined />,
        title: '细粒度控制',
        desc: '温度、Top-p 等推理参数可视化调节',
      },
      {
        icon: <ToolOutlined />,
        title: '安全合规能力',
        desc: '内置内容安全、审计与合规策略',
      },
    ],
  },
  {
    id: 'performance',
    title: '性能优化',
    subtitle: '稳定高效运行，支持大规模部署',
    mediaClass: 'core-card-media--performance',
    features: [
      {
        icon: <EnterOutlined />,
        title: '多级缓存加速',
        desc: '请求级、会话级缓存，显著降低响应延迟',
      },
      {
        icon: <WindowsOutlined />,
        title: '弹性伸缩',
        desc: '自动扩缩容，应对业务高峰',
      },
      {
        icon: <ZoomInOutlined />,
        title: '可观测性',
        desc: '全链路监控、日志与指标采集',
      },
      {
        icon: <ToolOutlined />,
        title: '成本优化',
        desc: '推理并发控制与配额管理，降低模型调用成本',
      },
    ],
  },
] as const;

const CoreCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); // 默认第一张「开发者平台」

  const activeSlide = coreSlides[activeIndex];
  const nextIndex = (activeIndex + 1) % coreSlides.length;
  const nextSlide = coreSlides[nextIndex];

  return (
    <>
      <div className="core-card-row">
        <article className="core-card">
          <div className="core-card-text">
            <header className="core-card-header">
              <h3>{activeSlide.title}</h3>
              <p>{activeSlide.subtitle}</p>
            </header>
            <div className="core-card-grid">
              {activeSlide.features.map((feature, idx) => (
                <div
                  key={feature.title}
                  className={`core-feature ${idx === 2 ? 'core-feature--highlight' : ''}`}
                >
                  <div className="core-feature-icon">{feature.icon}</div>
                  <div className="core-feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="pill-button core-button">
              <span>查看详情</span>
              <span className="pill-icon">
                <ArrowRightOutlined />
              </span>
            </button>
          </div>
          <div className={`core-card-media ${activeSlide.mediaClass}`} />
        </article>

        <aside className="core-preview">
          <div className={`core-preview-media ${nextSlide.mediaClass}`}>
            <div className="core-preview-overlay">
              <header className="core-preview-header">
                <h3>{nextSlide.title}</h3>
                <p>{nextSlide.subtitle}</p>
              </header>
              <button className="pill-button core-button core-button--small">
                <span>查看详情</span>
                <span className="pill-icon">
                  <ArrowRightOutlined />
                </span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div className="core-carousel-nav">
        {coreSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`core-carousel-dot ${
              index === activeIndex ? 'core-carousel-dot--active' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
