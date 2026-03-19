import React, { useEffect, useRef, useState } from 'react';
import CTAButton from '../../components/common/CTAButton';
import { getAssetPath } from '../../utils/path';
import MessageBoard from '../MessageBoard';
import './ProductMainImg.css';

const HERO_CANVAS_WIDTH = 1088;
const HERO_CANVAS_HEIGHT = 496;
const TRAIL_POINT_COUNT = 36;
const TRAIL_INSTANCE_COUNT = 3;
const TRAIL_HEAD_RADIUS = 1.62;
const TRAIL_TAIL_RADIUS = 0.48;
const TRAIL_FADE_POWER = 1.28;

type HeroNodeVariant = 'default' | 'gemini';

type HeroNode = {
  key: string;
  x: number;
  y: number;
  size: number;
  icon?: string;
  alt: string;
  side: 'left' | 'right';
  variant?: HeroNodeVariant;
};

type ValueCard = {
  icon: string;
  title: string;
  description: string;
};

type TrailRouteId = 'trail-main-forward' | 'trail-main-reverse' | 'trail-left-key' | 'trail-right-key';

type TrailRoute = {
  id: TrailRouteId;
  speed: number;
};

type TrailPoint = {
  x: number;
  y: number;
  alpha: number;
  radius: number;
};

type TrailRunner = {
  routeIndex: number;
  travelledDistance: number;
  speedScale: number;
  history: Array<{ x: number; y: number }>;
};

const heroNodes: HeroNode[] = [
  { key: 'left-openai', x: 99, y: 89, size: 104, icon: '/images/icons/product/openai.svg', alt: 'OpenAI', side: 'left' },
  { key: 'left-qwen', x: 61, y: 248, size: 60, icon: '/images/icons/product/通义千问.svg', alt: '通义千问', side: 'left' },
  { key: 'left-kimi', x: 129, y: 397, size: 92, icon: '/images/icons/product/kimi.svg', alt: 'Kimi', side: 'left' },
  { key: 'left-wecom', x: 292, y: 132, size: 72, icon: '/images/icons/product/企微.svg', alt: '企微', side: 'left' },
  { key: 'left-gemini', x: 418.5, y: 208.5, size: 61, alt: 'Gemini', side: 'left', variant: 'gemini' },
  { key: 'left-placeholder', x: 340, y: 362, size: 72, icon: '/images/icons/product/飞书.svg', alt: '生态模型', side: 'left' },
  { key: 'right-dingtalk', x: 672, y: 209, size: 72, icon: '/images/icons/product/钉钉.svg', alt: '钉钉', side: 'right' },
  { key: 'right-wecom', x: 797, y: 133, size: 64, icon: '/images/icons/product/企微.svg', alt: '企微', side: 'right' },
  { key: 'right-feishu', x: 750, y: 362, size: 72, icon: '/images/icons/product/飞书.svg', alt: '飞书', side: 'right' },
  { key: 'right-openai', x: 991, y: 89, size: 88, icon: '/images/icons/product/openai.svg', alt: 'OpenAI', side: 'right' },
  { key: 'right-qwen', x: 1035, y: 249, size: 64, icon: '/images/icons/product/通义千问.svg', alt: '通义千问', side: 'right' },
  { key: 'right-zhipu', x: 961, y: 397, size: 104, icon: '/images/icons/product/质谱.svg', alt: '质谱', side: 'right' },
];

const valueCards: ValueCard[] = [
  {
    icon: '/images/icons/product/统一管理.svg',
    title: '统一管理',
    description: '多模型统一接入 / 监控 / 调度，支持国内外厂商 + 本地模型，一站式管控模型生命周期',
  },
  {
    icon: '/images/icons/product/快速构建.svg',
    title: '快速构建',
    description: '低代码可视化设计 Agent / 工作流，节点级调试，一键发布部署',
  },
  {
    icon: '/images/icons/product/知识驱动.svg',
    title: '知识驱动',
    description: '全流程 RAG 能力，多格式文档解析 + 智能检索 + 幻觉抑制，为 AI 提供精准知识支撑',
  },
  {
    icon: '/images/icons/product/工具生态.svg',
    title: '工具生态',
    description: '海量内置工具组件，支持自定义开发 + 第三方集成，无限扩展 AI 能力边界',
  },
  {
    icon: '/images/icons/product/流程编排.svg',
    title: '流程编排',
    description: '多模式工作流设计，支持复杂分支 / 并行 / 断点重试，适配企业复杂业务逻辑',
  },
];

const trailRouteOrder: TrailRoute[] = [
  { id: 'trail-main-forward', speed: 188 },
  { id: 'trail-left-key', speed: 140 },
  { id: 'trail-main-reverse', speed: 188 },
  { id: 'trail-right-key', speed: 140 },
];

const toCanvasXPercent = (x: number) => `${(x / HERO_CANVAS_WIDTH) * 100}%`;
const toCanvasYPercent = (y: number) => `${(y / HERO_CANVAS_HEIGHT) * 100}%`;

const ProductMainImg: React.FC = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [activeLane, setActiveLane] = useState<'left' | 'right'>('left');
  const [trailGroups, setTrailGroups] = useState<TrailPoint[][]>([]);
  const pathRefs = useRef<Record<TrailRouteId, SVGPathElement | null>>({
    'trail-main-forward': null,
    'trail-main-reverse': null,
    'trail-left-key': null,
    'trail-right-key': null,
  });
  const trailRunnersRef = useRef<TrailRunner[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveLane((prev) => (prev === 'left' ? 'right' : 'left'));
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const routeSeeds = [0, 1, 3];
    trailRunnersRef.current = Array.from({ length: TRAIL_INSTANCE_COUNT }, (_, index) => ({
      routeIndex: routeSeeds[index % routeSeeds.length],
      travelledDistance: index * 164,
      speedScale: 0.9 + index * 0.07,
      history: [],
    }));

    let rafId = 0;
    let lastTimestamp = 0;

    const tick = (timestamp: number) => {
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      trailRunnersRef.current.forEach((runner) => {
        let route = trailRouteOrder[runner.routeIndex];
        let currentPath = pathRefs.current[route.id];

        if (!currentPath) {
          return;
        }

        let totalLength = currentPath.getTotalLength();
        runner.travelledDistance += route.speed * runner.speedScale * deltaSeconds;

        while (runner.travelledDistance >= totalLength) {
          runner.travelledDistance -= totalLength;
          runner.routeIndex = (runner.routeIndex + 1) % trailRouteOrder.length;
          route = trailRouteOrder[runner.routeIndex];
          currentPath = pathRefs.current[route.id];
          if (!currentPath) {
            return;
          }
          totalLength = currentPath.getTotalLength();
          runner.history = [];
        }

        const point = currentPath.getPointAtLength(Math.max(0, Math.min(runner.travelledDistance, totalLength)));
        runner.history.unshift({ x: point.x, y: point.y });

        if (runner.history.length > TRAIL_POINT_COUNT) {
          runner.history.length = TRAIL_POINT_COUNT;
        }
      });

      setTrailGroups(
        trailRunnersRef.current.map((runner, runnerIndex) =>
          runner.history.map((item, pointIndex) => {
            const fade = 1 - pointIndex / TRAIL_POINT_COUNT;
            const groupFade = 0.98 - runnerIndex * 0.06;
            return {
              x: item.x,
              y: item.y,
              alpha: Math.pow(fade, TRAIL_FADE_POWER) * groupFade,
              radius: TRAIL_TAIL_RADIUS + fade * (TRAIL_HEAD_RADIUS - TRAIL_TAIL_RADIUS),
            };
          }),
        ),
      );

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const createPathRefHandler = (id: TrailRouteId) => (node: SVGPathElement | null) => {
    pathRefs.current[id] = node;
  };

  return (
    <section className="product-main-img">
      <div className="product-main-img__bg-overlay" />

      <div className="product-main-img__container">
        <header className="product-main-img__header">
          <h1 className="product-main-img__title">VERT 大模型中台 - 企业级一体化智能服务平台</h1>
          <p className="product-main-img__subtitle">
            一站式实现大模型统一管理、智能 Agent 构建、知识库 &amp; RAG 引擎、可视化工作流编排与工具生态集成，
            低代码降低企业 AI 开发门槛，高可扩展赋能全场景 AI 落地执行
          </p>
          <CTAButton className="product-main-img__cta" onClick={() => setIsMessageOpen(true)}>
            立即开始
          </CTAButton>
        </header>

        <div className="product-main-img__hero">
          <div className={`product-main-img__outer-aura product-main-img__outer-aura--left ${activeLane === 'left' ? 'is-active' : ''}`} aria-hidden>
            <img className="product-main-img__outer-aura-core" src={getAssetPath('/images/icons/product/左边光圈.svg')} alt="" />
            <img className="product-main-img__outer-aura-line" src={getAssetPath('/images/icons/product/线性光圈左.svg')} alt="" />
          </div>
          <div className={`product-main-img__outer-aura product-main-img__outer-aura--right ${activeLane === 'right' ? 'is-active' : ''}`} aria-hidden>
            <img className="product-main-img__outer-aura-core" src={getAssetPath('/images/icons/product/右边光圈.svg')} alt="" />
            <img className="product-main-img__outer-aura-line" src={getAssetPath('/images/icons/product/线性光圈右.svg')} alt="" />
          </div>

          <div className={`product-main-img__hero-shell product-main-img__hero-shell--${activeLane}`}>
            <svg
              className="product-main-img__topology-svg"
              viewBox="0 0 1088 496"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <radialGradient id="productMainImgCenterGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(544 248) rotate(90) scale(114.4)">
                  <stop stopColor="#AEFF21" stopOpacity="0.78" />
                  <stop offset="0.68" stopColor="#52C91A" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#000000" stopOpacity="0" />
                </radialGradient>

                <filter id="productMainImgTrailBlur" x="-24" y="-24" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur stdDeviation="2.8" result="effect1_foregroundBlur_0_0" />
                </filter>
              </defs>

              <circle cx="544" cy="248" r="226.8" className="product-main-img__topology-ring product-main-img__topology-ring--outer" />
              <circle cx="544" cy="248" r="176.4" className="product-main-img__topology-ring product-main-img__topology-ring--mid" />
              <circle cx="544" cy="248" r="114.4" className="product-main-img__topology-ring product-main-img__topology-ring--inner" />
              <circle cx="544" cy="248" r="86" fill="url(#productMainImgCenterGlow)" />

              <path className="product-main-img__topology-path product-main-img__topology-path--main" d="M34 248H1054" />
              <path className="product-main-img__topology-path product-main-img__topology-path--lane-overlay" data-lane="left" d="M34 248H544" />
              <path className="product-main-img__topology-path product-main-img__topology-path--lane-overlay" data-lane="right" d="M544 248H1054" />

              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M108.8 89H184C205.2 89 216.4 102 216.4 123V184" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M129 397H184C205.2 397 216.4 383.2 216.4 362V303" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M216.4 184V362" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M216.4 163H274.2C304.8 163 328 169.6 328 193" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M216.4 362H304" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M328 193C328 216 344 228 366 228H388" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M376 362H404C420 362 426.4 345.6 426.4 321V287H456" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch-strong" data-lane="left" d="M426.4 213H456" />

              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M991 89H905C883.8 89 873.2 102 873.2 123V184" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M961 397H905C883.8 397 873.2 383.2 873.2 362V303" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M873.2 184V362" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M873.2 163H815.4C784.8 163 760 169.6 760 193" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M873.2 362H786" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M760 193C760 216 742 228 720 228H708" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M714 362H686C669.6 362 663.2 345.6 663.2 321V287H633.6" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch-strong" data-lane="right" d="M663.2 213H633.6" />

              <g className="product-main-img__topology-trail">
                {trailGroups.map((group, groupIndex) => (
                  <g key={`trail-group-${groupIndex}`}>
                    {[...group].reverse().map((point, pointIndex) => (
                      <g key={`${groupIndex}-${pointIndex}-${point.x.toFixed(1)}-${point.y.toFixed(1)}`}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={point.radius * 1.06}
                          fill="#AEFF21"
                          opacity={point.alpha * 0.16}
                          filter="url(#productMainImgTrailBlur)"
                        />
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={point.radius}
                          fill="#D5FF7D"
                          opacity={Math.min(1, point.alpha * 1.08)}
                        />
                      </g>
                    ))}
                  </g>
                ))}
              </g>

              <path ref={createPathRefHandler('trail-main-forward')} className="product-main-img__topology-trail-track" d="M34 248H1054" />
              <path ref={createPathRefHandler('trail-main-reverse')} className="product-main-img__topology-trail-track" d="M1054 248H34" />
              <path ref={createPathRefHandler('trail-left-key')} className="product-main-img__topology-trail-track" d="M328 193C328 216 344 228 366 228H426.4C438.4 228 448.8 221.6 456 213" />
              <path ref={createPathRefHandler('trail-right-key')} className="product-main-img__topology-trail-track" d="M760 193C760 216 742 228 720 228H663.2C650.8 228 640.8 220.8 633.6 213" />
            </svg>

            <div className="product-main-img__node-layer">
              <div
                className="product-main-img__vert-pill product-main-img__vert-pill--left"
                style={
                  {
                    ['--pill-x' as string]: toCanvasXPercent(172),
                    ['--pill-y' as string]: toCanvasYPercent(232),
                  } as React.CSSProperties
                }
              >
                <span>VERT</span>
                <img src={getAssetPath('/images/icons/product/绿点.svg')} alt="" aria-hidden />
              </div>
              <div
                className="product-main-img__vert-pill product-main-img__vert-pill--right"
                style={
                  {
                    ['--pill-x' as string]: toCanvasXPercent(837.6),
                    ['--pill-y' as string]: toCanvasYPercent(232),
                  } as React.CSSProperties
                }
              >
                <span>VERT</span>
                <img src={getAssetPath('/images/icons/product/绿点.svg')} alt="" aria-hidden />
              </div>

              {heroNodes.map((node) => (
                <div
                  key={node.key}
                  className={[
                    'product-main-img__node',
                    node.variant === 'gemini' ? 'product-main-img__node--gemini' : 'product-main-img__node--default',
                    activeLane === node.side ? 'is-lane-active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  data-side={node.side}
                  style={
                    {
                      ['--node-x' as string]: toCanvasXPercent(node.x),
                      ['--node-y' as string]: toCanvasYPercent(node.y),
                      ['--node-size' as string]: toCanvasXPercent(node.size),
                    } as React.CSSProperties
                  }
                >
                  {node.variant === 'gemini' ? (
                    <div className="product-main-img__gemini-layered">
                      <img
                        className="product-main-img__gemini-glow"
                        src={getAssetPath('/images/icons/product/绿色光晕.svg')}
                        alt=""
                        aria-hidden
                        loading="lazy"
                      />
                      <img
                        className="product-main-img__gemini-disc"
                        src={getAssetPath('/images/icons/product/白色底盘.svg')}
                        alt=""
                        aria-hidden
                        loading="lazy"
                      />
                      <img
                        className="product-main-img__gemini-icon"
                        src={getAssetPath('/images/icons/product/gemini.png')}
                        alt={node.alt}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <img src={getAssetPath(node.icon ?? '/images/icons/product/openai.svg')} alt={node.alt} loading="lazy" />
                  )}
                </div>
              ))}

              <div className="product-main-img__center-node">
                <div className="product-main-img__center-core">
                  <img src={getAssetPath('/images/icons/product/Union.svg')} alt="" aria-hidden />
                  <span>VERT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="product-main-img__values">
          <h2 className="product-main-img__values-title">五大核心价值，重构企业 AI 开发效率</h2>
          <div className="product-main-img__values-grid">
            {valueCards.map((card) => (
              <article key={card.title} className="product-main-img__value-card">
                <div className="product-main-img__value-icon">
                  <img src={getAssetPath(card.icon)} alt="" aria-hidden loading="lazy" />
                </div>
                <h3 className="product-main-img__value-title">{card.title}</h3>
                <p className="product-main-img__value-desc">{card.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default ProductMainImg;
