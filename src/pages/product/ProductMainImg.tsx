import React, { useEffect, useRef, useState } from 'react';
import CTAButton from '../../components/common/CTAButton';
import { getAssetPath } from '../../utils/path';
import MessageBoard from '../MessageBoard';
import './ProductMainImg.css';

const HERO_CANVAS_WIDTH = 1088;
const HERO_CANVAS_HEIGHT = 496;

const CARD_TRAIL_POINT_COUNT = 36;
const CARD_TRAIL_HEAD_RADIUS = 1.58;
const CARD_TRAIL_TAIL_RADIUS = 0.45;
const CARD_TRAIL_FADE_POWER = 1.25;

const BG_TRAIL_HEAD_RADIUS = 1.58;
const BG_TRAIL_TAIL_RATIO = 0.15;
const BG_TRAIL_POINT_COUNT = 24;
const BG_TRAIL_FADE_POWER = 1.55;
const BG_TRAIL_CYCLE_MS = 5600;
const BG_TRAIL_SPEED_REFERENCE = 56;

const BG_RING_CENTER_X = 960;
const BG_RING_CENTER_Y = 1488;
const BG_RING_RADIUS_2602 = 1301;
const BG_RING_RADIUS_3000 = 1500;

type HeroNodeVariant = 'default' | 'gemini' | 'claude';

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
  iconTitleGap: 28 | 32;
};

type CardTrailRouteId =
  | 'card-main-forward'
  | 'card-main-reverse'
  | 'card-left-upper-inner'
  | 'card-right-upper-inner'
  | 'card-left-lower-inner'
  | 'card-right-lower-inner';
type BgTrailRouteId = 'bg-ring-2602' | 'bg-ring-3000';

type TrailRoute<T extends string> = {
  id: T;
  speed: number;
  direction?: 1 | -1;
  phaseRatio?: number;
};

type TrailPoint = {
  x: number;
  y: number;
  alpha: number;
  radius: number;
};

type TrailRunner = {
  routeId: CardTrailRouteId;
  travelledDistance: number;
  speedScale: number;
  history: Array<{ x: number; y: number }>;
};

type BgTrailState = {
  id: BgTrailRouteId;
  head: TrailPoint;
  tail: TrailPoint[];
};

const heroNodes: HeroNode[] = [
  { key: 'left-openai', x: 47, y: 37, size: 104, icon: '/images/icons/product/openai.svg', alt: 'OpenAI', side: 'left' },
  { key: 'left-qwen', x: 31, y: 218, size: 60, icon: '/images/icons/product/通义千问.svg', alt: '通义千问', side: 'left' },
  { key: 'left-kimi', x: 83, y: 351, size: 92, icon: '/images/icons/product/kimi.svg', alt: 'Kimi', side: 'left' },
  { key: 'left-wecom', x: 256, y: 96, size: 72, icon: '/images/icons/product/企微.svg', alt: '企微', side: 'left' },
  { key: 'left-gemini', x: 388, y: 178, size: 61, alt: 'Gemini', side: 'left', variant: 'gemini' },
  { key: 'left-claude', x: 304, y: 326, size: 80, alt: 'Claude', side: 'left', variant: 'claude' },
  { key: 'right-dingtalk', x: 684, y: 173, size: 72, icon: '/images/icons/product/钉钉.svg', alt: '钉钉', side: 'right' },
  { key: 'right-wecom', x: 765, y: 101, size: 64, icon: '/images/icons/product/企微.svg', alt: '企微', side: 'right' },
  { key: 'right-feishu', x: 714, y: 326, size: 72, icon: '/images/icons/product/飞书.svg', alt: '飞书', side: 'right' },
  { key: 'right-openai', x: 947, y: 45, size: 88, icon: '/images/icons/product/openai.svg', alt: 'OpenAI', side: 'right' },
  { key: 'right-qwen', x: 1003, y: 217, size: 64, icon: '/images/icons/product/通义千问.svg', alt: '通义千问', side: 'right' },
  { key: 'right-zhipu', x: 909, y: 345, size: 104, icon: '/images/icons/product/质谱.svg', alt: '质谱', side: 'right' },
];

const valueCards: ValueCard[] = [
  {
    icon: '/images/icons/product/统一管理.svg',
    title: '统一管理',
    description: '多模型统一接入 / 监控 / 调度，支持国内外厂商+本地模型，一站式管控模型生命周期',
    iconTitleGap: 32,
  },
  {
    icon: '/images/icons/product/快速构建.svg',
    title: '快速构建',
    description: '低代码可视化设计 Agent / 工作流，节点级调试，一键发布部署',
    iconTitleGap: 32,
  },
  {
    icon: '/images/icons/product/知识驱动.svg',
    title: '知识驱动',
    description: '全流程RAG能力，多格式文档解析 + 智能检索 + 幻觉抑制，为 AI 提供精准知识支撑',
    iconTitleGap: 28,
  },
  {
    icon: '/images/icons/product/工具生态.svg',
    title: '工具生态',
    description: '海量内置工具组件，支持自定义开发 + 第三方集成，无限扩展 AI 能力边界',
    iconTitleGap: 28,
  },
  {
    icon: '/images/icons/product/流程编排.svg',
    title: '流程编排',
    description: '多模式工作流设计，支持复杂分支 / 并行 / 断点重试，适配企业复杂业务逻辑',
    iconTitleGap: 28,
  },
];

const cardTrailRouteOrder: TrailRoute<CardTrailRouteId>[] = [
  { id: 'card-main-forward', speed: 186 },
  { id: 'card-main-reverse', speed: 186 },
  { id: 'card-left-upper-inner', speed: 140 },
  { id: 'card-right-upper-inner', speed: 140 },
  { id: 'card-left-lower-inner', speed: 132 },
  { id: 'card-right-lower-inner', speed: 132 },
];

const bgTrailRouteOrder: TrailRoute<BgTrailRouteId>[] = [
  { id: 'bg-ring-3000', speed: 28, direction: -1, phaseRatio: 0.875 },
  { id: 'bg-ring-2602', speed: 28, direction: 1, phaseRatio: 0.625 },
];

const toCanvasXPercent = (x: number) => `${(x / HERO_CANVAS_WIDTH) * 100}%`;
const toCanvasYPercent = (y: number) => `${(y / HERO_CANVAS_HEIGHT) * 100}%`;
const buildTrailPath = (points: Array<{ x: number; y: number }>) => {
  if (points.length === 0) {
    return '';
  }
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }
  return `M ${points[0].x} ${points[0].y} ${points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ')}`;
};

const ProductMainImg: React.FC = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [activeLane, setActiveLane] = useState<'left' | 'right'>('left');
  const [cardTrailGroups, setCardTrailGroups] = useState<TrailPoint[][]>([]);
  const [bgTrailStates, setBgTrailStates] = useState<BgTrailState[]>([]);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const bgSvgRef = useRef<SVGSVGElement | null>(null);

  const cardPathRefs = useRef<Record<CardTrailRouteId, SVGPathElement | null>>({
    'card-main-forward': null,
    'card-main-reverse': null,
    'card-left-upper-inner': null,
    'card-right-upper-inner': null,
    'card-left-lower-inner': null,
    'card-right-lower-inner': null,
  });

  const bgPathRefs = useRef<Record<BgTrailRouteId, SVGCircleElement | null>>({
    'bg-ring-2602': null,
    'bg-ring-3000': null,
  });

  const cardTrailRunnersRef = useRef<TrailRunner[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveLane((prev) => (prev === 'left' ? 'right' : 'left'));
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    cardTrailRunnersRef.current = cardTrailRouteOrder.map((route, index) => ({
      routeId: route.id,
      travelledDistance: index * 120,
      speedScale: 0.92 + index * 0.04,
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

      cardTrailRunnersRef.current.forEach((runner) => {
        const route = cardTrailRouteOrder.find((item) => item.id === runner.routeId);
        const currentPath = route ? cardPathRefs.current[route.id] : null;

        if (!route || !currentPath) {
          return;
        }

        let totalLength = currentPath.getTotalLength();
        runner.travelledDistance += route.speed * runner.speedScale * deltaSeconds;

        while (runner.travelledDistance >= totalLength) {
          runner.travelledDistance -= totalLength;
          totalLength = currentPath.getTotalLength();
        }

        const point = currentPath.getPointAtLength(Math.max(0, Math.min(runner.travelledDistance, totalLength)));
        runner.history.unshift({ x: point.x, y: point.y });

        if (runner.history.length > CARD_TRAIL_POINT_COUNT) {
          runner.history.length = CARD_TRAIL_POINT_COUNT;
        }
      });

      setCardTrailGroups(
        cardTrailRunnersRef.current.map((runner, runnerIndex) =>
          runner.history.map((item, pointIndex) => {
            const fade = 1 - pointIndex / CARD_TRAIL_POINT_COUNT;
            const groupFade = 1 - runnerIndex * 0.06;
            return {
              x: item.x,
              y: item.y,
              alpha: Math.pow(fade, CARD_TRAIL_FADE_POWER) * groupFade,
              radius: CARD_TRAIL_TAIL_RADIUS + fade * (CARD_TRAIL_HEAD_RADIUS - CARD_TRAIL_TAIL_RADIUS),
            };
          }),
        ),
      );

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let geometryRafId = 0;
    let lastTimestamp = 0;
    let elapsedMs = 0;
    type SegmentSample = {
      x: number;
      y: number;
      d: number;
    };
    type RouteGeometry = {
      id: BgTrailRouteId;
      samples: SegmentSample[];
      totalDistance: number;
    };
    const routeGeometryRef: { current: Record<BgTrailRouteId, RouteGeometry | null> } = {
      current: { 'bg-ring-2602': null, 'bg-ring-3000': null },
    };
    const getPointAtDistance = (samples: SegmentSample[], targetDistance: number) => {
      if (samples.length === 0) {
        return { x: 0, y: 0 };
      }

      if (targetDistance <= 0) {
        return { x: samples[0].x, y: samples[0].y };
      }

      const last = samples[samples.length - 1];
      if (targetDistance >= last.d) {
        return { x: last.x, y: last.y };
      }

      for (let i = 1; i < samples.length; i += 1) {
        const prev = samples[i - 1];
        const next = samples[i];
        if (targetDistance <= next.d) {
          const span = Math.max(0.0001, next.d - prev.d);
          const t = (targetDistance - prev.d) / span;
          return {
            x: prev.x + (next.x - prev.x) * t,
            y: prev.y + (next.y - prev.y) * t,
          };
        }
      }

      return { x: last.x, y: last.y };
    };
    const buildRouteGeometry = (
      routeId: BgTrailRouteId,
      circle: SVGCircleElement,
      sectionRect: DOMRect,
      viewportRect: { left: number; top: number; right: number; bottom: number },
      matrix: DOMMatrix,
    ): RouteGeometry | null => {
      const totalLength = circle.getTotalLength();
      const sampleCount = 1000;
      const visibleRect = {
        left: Math.max(sectionRect.left, viewportRect.left),
        top: Math.max(sectionRect.top, viewportRect.top),
        right: Math.min(sectionRect.right, viewportRect.right),
        bottom: Math.min(sectionRect.bottom, viewportRect.bottom),
      };

      if (visibleRect.left >= visibleRect.right || visibleRect.top >= visibleRect.bottom) {
        return null;
      }

      const samples = Array.from({ length: sampleCount }, (_, index) => {
        const lengthAt = (totalLength * index) / sampleCount;
        const point = circle.getPointAtLength(lengthAt);
        const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix);
        const isInVisibleBox =
          screenPoint.x >= visibleRect.left &&
          screenPoint.x <= visibleRect.right &&
          screenPoint.y >= visibleRect.top &&
          screenPoint.y <= visibleRect.bottom;
        const isInTargetHemisphere = point.y <= BG_RING_CENTER_Y;

        return {
          x: point.x,
          y: point.y,
          screenX: screenPoint.x,
          visible: isInVisibleBox && isInTargetHemisphere,
        };
      });

      let bestStart = 0;
      let bestLength = 0;
      let runStart = -1;
      let runLength = 0;
      for (let i = 0; i < sampleCount * 2; i += 1) {
        if (samples[i % sampleCount].visible) {
          if (runStart < 0) {
            runStart = i;
            runLength = 1;
          } else {
            runLength += 1;
          }

          if (runLength > bestLength) {
            bestLength = runLength;
            bestStart = runStart;
          }
        } else {
          runStart = -1;
          runLength = 0;
        }
      }

      if (bestLength < 4) {
        return null;
      }

      const segmentLength = Math.min(bestLength, sampleCount);
      const segment = Array.from({ length: segmentLength }, (_, offset) => samples[(bestStart + offset) % sampleCount]);

      let minXIndex = 0;
      let maxXIndex = 0;
      for (let i = 1; i < segment.length; i += 1) {
        if (segment[i].screenX < segment[minXIndex].screenX) {
          minXIndex = i;
        }
        if (segment[i].screenX > segment[maxXIndex].screenX) {
          maxXIndex = i;
        }
      }

      const startIndex = routeId === 'bg-ring-3000' ? maxXIndex : minXIndex;
      const endIndex = routeId === 'bg-ring-3000' ? minXIndex : maxXIndex;
      let directedSamples =
        startIndex <= endIndex
          ? segment.slice(startIndex, endIndex + 1)
          : segment.slice(endIndex, startIndex + 1).reverse();

      const firstPoint = directedSamples[0];
      const lastPoint = directedSamples[directedSamples.length - 1];
      const shouldReverseDirection =
        (routeId === 'bg-ring-3000' && firstPoint.screenX < lastPoint.screenX) ||
        (routeId === 'bg-ring-2602' && firstPoint.screenX > lastPoint.screenX);
      if (shouldReverseDirection) {
        directedSamples = [...directedSamples].reverse();
      }

      if (directedSamples.length < 3) {
        return null;
      }

      const normalizedSamples: SegmentSample[] = [{ x: directedSamples[0].x, y: directedSamples[0].y, d: 0 }];
      let distance = 0;
      for (let i = 1; i < directedSamples.length; i += 1) {
        const prev = directedSamples[i - 1];
        const next = directedSamples[i];
        distance += Math.hypot(next.x - prev.x, next.y - prev.y);
        normalizedSamples.push({ x: next.x, y: next.y, d: distance });
      }

      if (distance < 1) {
        return null;
      }

      return { id: routeId, samples: normalizedSamples, totalDistance: distance };
    };
    const refreshRouteGeometry = () => {
      const svg = bgSvgRef.current;
      const section = heroSectionRef.current;
      if (!svg || !section) {
        return;
      }

      const matrix = svg.getScreenCTM();
      if (!matrix) {
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const viewportRect = { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };

      bgTrailRouteOrder.forEach((route) => {
        const circle = bgPathRefs.current[route.id];
        if (!circle) {
          routeGeometryRef.current[route.id] = null;
          return;
        }

        routeGeometryRef.current[route.id] = buildRouteGeometry(route.id, circle, sectionRect, viewportRect, matrix);
      });
    };
    const scheduleGeometryRefresh = () => {
      if (geometryRafId) {
        window.cancelAnimationFrame(geometryRafId);
      }
      geometryRafId = window.requestAnimationFrame(refreshRouteGeometry);
    };

    scheduleGeometryRefresh();
    window.addEventListener('resize', scheduleGeometryRefresh);
    window.addEventListener('scroll', scheduleGeometryRefresh, { passive: true });

    const tick = (timestamp: number) => {
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      elapsedMs += deltaSeconds * 1000;

      setBgTrailStates(
        bgTrailRouteOrder
          .map((route) => {
            const geometry = routeGeometryRef.current[route.id];
            if (!geometry) {
              return null;
            }

            const scaledElapsedMs = elapsedMs * (route.speed / BG_TRAIL_SPEED_REFERENCE);
            const progress = (scaledElapsedMs % BG_TRAIL_CYCLE_MS) / BG_TRAIL_CYCLE_MS;
            const firstSample = geometry.samples[0];
            const lastSample = geometry.samples[geometry.samples.length - 1];
            const isLeftToRight = firstSample.x < lastSample.x;
            const shouldBeLeftToRight = route.id === 'bg-ring-2602';
            const routeProgress = isLeftToRight === shouldBeLeftToRight ? progress : 1 - progress;
            const headDistance = geometry.totalDistance * routeProgress;
            const tailLength = geometry.totalDistance * BG_TRAIL_TAIL_RATIO;
            const step = tailLength / Math.max(1, BG_TRAIL_POINT_COUNT - 1);
            const headPoint = getPointAtDistance(geometry.samples, headDistance);
            const tail = Array.from({ length: BG_TRAIL_POINT_COUNT }, (_, index) => {
              const distance = Math.max(0, headDistance - index * step);
              const point = getPointAtDistance(geometry.samples, distance);
              const fade = 1 - index / BG_TRAIL_POINT_COUNT;
              return {
                x: point.x,
                y: point.y,
                alpha: Math.pow(fade, BG_TRAIL_FADE_POWER) * 0.56,
                radius: 0.34 + fade * 0.82,
              };
            });

            return {
              id: route.id,
              head: {
                x: headPoint.x,
                y: headPoint.y,
                alpha: 0.8,
                radius: BG_TRAIL_HEAD_RADIUS,
              },
              tail,
            } satisfies BgTrailState;
          })
          .filter((item): item is BgTrailState => Boolean(item)),
      );

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
      if (geometryRafId) {
        window.cancelAnimationFrame(geometryRafId);
      }
      window.removeEventListener('resize', scheduleGeometryRefresh);
      window.removeEventListener('scroll', scheduleGeometryRefresh);
    };
  }, []);

  const createCardPathRefHandler = (id: CardTrailRouteId) => (node: SVGPathElement | null) => {
    cardPathRefs.current[id] = node;
  };

  const createBgPathRefHandler = (id: BgTrailRouteId) => (node: SVGCircleElement | null) => {
    bgPathRefs.current[id] = node;
  };

  return (
    <section ref={heroSectionRef} className="product-main-img">
      <div className="product-main-img__bg-overlay" />

      <svg ref={bgSvgRef} className="product-main-img__background-arc-svg" viewBox="0 0 1920 1600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <filter id="productMainImgBgTrailBlur" x="-30" y="-30" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_0_0" />
          </filter>
        </defs>

        <circle className="product-main-img__background-ring product-main-img__background-ring--3000" cx={BG_RING_CENTER_X} cy={BG_RING_CENTER_Y} r={BG_RING_RADIUS_3000} />
        <circle className="product-main-img__background-ring product-main-img__background-ring--2602" cx={BG_RING_CENTER_X} cy={BG_RING_CENTER_Y} r={BG_RING_RADIUS_2602} />

        <g className="product-main-img__background-arc-trail">
          {bgTrailStates.map((state) => (
            <g key={`bg-trail-${state.id}`}>
              {(() => {
                const trailPoints = [...state.tail].reverse();
                const trailPath = buildTrailPath(trailPoints);
                const tailStart = trailPoints[0] ?? { x: state.head.x, y: state.head.y };
                const tailEnd = trailPoints[trailPoints.length - 1] ?? { x: state.head.x, y: state.head.y };
                const gradientId = `productMainImgBgTrailGrad-${state.id}`;
                return (
                  <>
                    <defs>
                      <linearGradient id={gradientId} x1={tailStart.x} y1={tailStart.y} x2={tailEnd.x} y2={tailEnd.y} gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#D5FF7D" stopOpacity="0.02" />
                        <stop offset="0.45" stopColor="#D5FF7D" stopOpacity="0.16" />
                        <stop offset="0.78" stopColor="#D5FF7D" stopOpacity="0.38" />
                        <stop offset="1" stopColor="#D5FF7D" stopOpacity="0.72" />
                      </linearGradient>
                    </defs>
                    <path d={trailPath} className="product-main-img__background-trail-path product-main-img__background-trail-path--glow" />
                    <path d={trailPath} className="product-main-img__background-trail-path product-main-img__background-trail-path--core" stroke={`url(#${gradientId})`} />
                  </>
                );
              })()}
              <circle cx={state.head.x} cy={state.head.y} r={state.head.radius * 1.2} fill="#AEFF21" opacity={0.08} filter="url(#productMainImgBgTrailBlur)" />
              <circle cx={state.head.x} cy={state.head.y} r={state.head.radius} fill="#D5FF7D" opacity={0.72} />
            </g>
          ))}
        </g>

        <circle ref={createBgPathRefHandler('bg-ring-2602')} className="product-main-img__background-arc-track" cx={BG_RING_CENTER_X} cy={BG_RING_CENTER_Y} r={BG_RING_RADIUS_2602} />
        <circle ref={createBgPathRefHandler('bg-ring-3000')} className="product-main-img__background-arc-track" cx={BG_RING_CENTER_X} cy={BG_RING_CENTER_Y} r={BG_RING_RADIUS_3000} />
      </svg>

      <div className="product-main-img__container">
        <header className="product-main-img__header">
          <h1 className="product-main-img__title">VERT 大模型中台 - 企业级一体化智能服务平台</h1>
          <p className="product-main-img__subtitle">
            一站式实现大模型统一管理、智能 Agent 构建、知识库 &amp; RAG 引擎、可视化工作流编排与工具生态集成，低代码降低企业 AI 开发门槛，高可扩展赋能全场景 AI 落地执行
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
            <svg className="product-main-img__corner-glow-layer" viewBox="0 0 1088 496" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs>
                <filter id="productMainImgCornerBlur" x="-240" y="-240" width="1560" height="976" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="120" result="effect1_foregroundBlur_0_0" />
                </filter>
                <linearGradient id="productMainImgCornerGradient" x1="0" y1="0" x2="980" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FF55" stopOpacity="0.75" />
                  <stop offset="1" stopColor="#99FF00" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <g filter="url(#productMainImgCornerBlur)" opacity="0.38">
                <path d="M430 26C505 33 566 74 618 98C668 121 729 132 804 116C871 102 936 114 1001 132C1032 141 1062 146 1088 143V-24H430Z" fill="url(#productMainImgCornerGradient)" />
              </g>
              <g filter="url(#productMainImgCornerBlur)" opacity="0.26" transform="translate(1088 496) rotate(180)">
                <path d="M430 26C505 33 566 74 618 98C668 121 729 132 804 116C871 102 936 114 1001 132C1032 141 1062 146 1088 143V-24H430Z" fill="url(#productMainImgCornerGradient)" />
              </g>
            </svg>

            <div className="product-main-img__concentric-disks" aria-hidden>
              <div className="product-main-img__concentric-disk product-main-img__concentric-disk--outer" />
              <div className="product-main-img__concentric-disk product-main-img__concentric-disk--mid" />
              <div className="product-main-img__concentric-disk product-main-img__concentric-disk--inner" />
            </div>

            <svg className="product-main-img__topology-svg" viewBox="0 0 1088 496" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs>
                <filter id="productMainImgCardTrailBlur" x="-24" y="-24" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur stdDeviation="2.8" result="effect1_foregroundBlur_0_0" />
                </filter>
              </defs>

              <path className="product-main-img__topology-path product-main-img__topology-path--main" d="M34 248H1054" />

              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M108.8 89.6H184C202.052 89.6 216.494 104.042 216.494 121.6V201.6" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M129 397H184C202.052 397 216.494 382.558 216.494 365V353.6" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M216.494 201.6V365.6" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M216.408 132H274.2" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M216.408 365.6H304" />
              <path className="product-main-img__topology-path product-main-img__topology-path--inner-fold" data-lane="left" d="M216.408 132H347.599C360.854 132 371.599 142.745 371.599 156V188C371.599 201.255 382.344 212 395.599 212H549.865" />
              <path className="product-main-img__topology-path product-main-img__topology-path--inner-fold" data-lane="left" d="M216.408 365.6H347.599C360.854 365.6 371.599 354.855 371.599 341.6V309.6C371.599 296.345 382.344 285.6 395.599 285.6H445.865" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M274.199 248.8H357.708" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="left" d="M456 285.6H496" />

              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M991 89.6H905C887.348 89.6 873.105 103.842 873.105 121.6V201.6" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M961 397H905C887.348 397 873.105 382.758 873.105 365V353.6" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M873.105 201.6V365.6" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M873.191 132H815.4" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M873.191 365.6H815.4" />
              <path className="product-main-img__topology-path product-main-img__topology-path--inner-fold" data-lane="right" d="M873.191 132H741.999C728.744 132 717.999 142.745 717.999 156V188C717.999 201.255 707.254 212 693.999 212H491.734" />
              <path className="product-main-img__topology-path product-main-img__topology-path--inner-fold" data-lane="right" d="M873.191 365.6H741.999C728.744 365.6 717.999 354.855 717.999 341.6V309.6C717.999 296.345 707.254 285.6 693.999 285.6H491.734" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M815.402 248.8H898.91" />
              <path className="product-main-img__topology-path product-main-img__topology-path--branch" data-lane="right" d="M633.599 285.6H697.599" />

              <g className="product-main-img__topology-trail">
                {cardTrailGroups.map((group, groupIndex) => (
                  <g key={`card-trail-group-${groupIndex}`}>
                    {[...group].reverse().map((point, pointIndex) => (
                      <g key={`${groupIndex}-${pointIndex}-${point.x.toFixed(1)}-${point.y.toFixed(1)}`}>
                        <circle cx={point.x} cy={point.y} r={point.radius * 1.06} fill="#AEFF21" opacity={point.alpha * 0.16} filter="url(#productMainImgCardTrailBlur)" />
                        <circle cx={point.x} cy={point.y} r={point.radius} fill="#D5FF7D" opacity={Math.min(1, point.alpha * 1.08)} />
                      </g>
                    ))}
                  </g>
                ))}
              </g>

              <path ref={createCardPathRefHandler('card-main-forward')} className="product-main-img__topology-trail-track" d="M34 248H1054" />
              <path ref={createCardPathRefHandler('card-main-reverse')} className="product-main-img__topology-trail-track" d="M1054 248H34" />
              <path
                ref={createCardPathRefHandler('card-left-upper-inner')}
                className="product-main-img__topology-trail-track"
                d="M216.408 132H347.599C360.854 132 371.599 142.745 371.599 156V188C371.599 201.255 382.344 212 395.599 212H549.865"
              />
              <path
                ref={createCardPathRefHandler('card-right-upper-inner')}
                className="product-main-img__topology-trail-track"
                d="M873.191 132H741.999C728.744 132 717.999 142.745 717.999 156V188C717.999 201.255 707.254 212 693.999 212H491.734"
              />
              <path
                ref={createCardPathRefHandler('card-left-lower-inner')}
                className="product-main-img__topology-trail-track"
                d="M216.408 365.6H347.599C360.854 365.6 371.599 354.855 371.599 341.6V309.6C371.599 296.345 382.344 285.6 395.599 285.6H445.865"
              />
              <path
                ref={createCardPathRefHandler('card-right-lower-inner')}
                className="product-main-img__topology-trail-track"
                d="M873.191 365.6H741.999C728.744 365.6 717.999 354.855 717.999 341.6V309.6C717.999 296.345 707.254 285.6 693.999 285.6H491.734"
              />
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
                <img src={getAssetPath('/images/icons/product/DeepSeek.svg')} alt="" aria-hidden />
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
                <img src={getAssetPath('/images/icons/product/DeepSeek.svg')} alt="" aria-hidden />
              </div>

              {heroNodes.map((node) => (
                <div
                  key={node.key}
                  className={[
                    'product-main-img__node',
                    node.variant === 'gemini' ? 'product-main-img__node--gemini' : node.variant === 'claude' ? 'product-main-img__node--claude' : 'product-main-img__node--default',
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
                      <img className="product-main-img__gemini-disc" src={getAssetPath('/images/icons/product/gemini透明底盘.svg')} alt="" aria-hidden loading="lazy" />
                      <span className="product-main-img__node-inner-white" aria-hidden />
                      <img className="product-main-img__gemini-icon" src={getAssetPath('/images/icons/product/gemini.png')} alt={node.alt} loading="lazy" />
                    </div>
                  ) : node.variant === 'claude' ? (
                    <div className="product-main-img__claude-layered">
                      <img className="product-main-img__claude-disc" src={getAssetPath('/images/icons/product/claude透明底盘.svg')} alt="" aria-hidden loading="lazy" />
                      <span className="product-main-img__node-inner-white" aria-hidden />
                      <img className="product-main-img__claude-icon" src={getAssetPath('/images/icons/product/claude.png')} alt={node.alt} loading="lazy" />
                    </div>
                  ) : (
                    <img src={getAssetPath(node.icon ?? '/images/icons/product/openai.svg')} alt={node.alt} loading="lazy" />
                  )}
                </div>
              ))}

              <div
                className="product-main-img__center-node"
                style={
                  {
                    ['--center-x' as string]: toCanvasXPercent(478),
                    ['--center-y' as string]: toCanvasYPercent(182),
                    ['--center-size' as string]: toCanvasXPercent(132),
                  } as React.CSSProperties
                }
                aria-hidden
              >
                <img className="product-main-img__center-base" src={getAssetPath('/images/icons/product/vert底座.svg')} alt="" />
                <div className="product-main-img__center-logo">
                  <img src={getAssetPath('/images/icons/product/Union.svg')} alt="" />
                  <span>VERT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="product-main-img__values">
          <div className="product-main-img__values-title-wrap">
            <h2 className="product-main-img__values-title">五大核心价值，重构企业 AI 开发效率</h2>
          </div>
          <div className="product-main-img__values-grid">
            {valueCards.map((card) => (
              <article
                key={card.title}
                className="product-main-img__value-card"
                style={{ ['--icon-title-gap' as string]: `${card.iconTitleGap}px` } as React.CSSProperties}
              >
                <div className="product-main-img__value-icon">
                  <img src={getAssetPath(card.icon)} alt="" aria-hidden loading="lazy" />
                </div>
                <div className="product-main-img__value-text-block">
                  <h3 className="product-main-img__value-title">{card.title}</h3>
                  <p className="product-main-img__value-desc">{card.description}</p>
                </div>
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
