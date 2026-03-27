import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import MessageBoard from '../MessageBoard';
import { getAssetPath } from '../../utils/path';
import './MaasMainImg.css';

const TYPE_SPEED_MS = 80;
const DELETE_SPEED_MS = 40;
const HOLD_MS = 1500;
const NEXT_TEXT_DELAY_MS = 500;
const TYPE_RANDOM_VARIANCE_MS = 50;

type StreakItem = {
  x: number;
  y: number;
  angle: number;
  direction: 'ltr' | 'rtl';
  length: number;
  speed: number;
  tailOpacity: number;
  headOpacity: number;
  lineWidth: number;
};

type DecorTrailRouteId = 'top-left' | 'right-oval' | 'bottom-left';

type DecorTrailPoint = {
  x: number;
  y: number;
};

type DecorTrailState = {
  id: DecorTrailRouteId;
  head: { x: number; y: number };
  tail: DecorTrailPoint[];
};

const DECOR_TRAIL_POINT_COUNT = 64;
const DECOR_TRAIL_TAIL_RATIO = 0.52; // 流光长度

const decorTrailRoutes: Array<{ id: DecorTrailRouteId; speed: number; phase: number }> = [
  { id: 'top-left', speed: 96, phase: 0 },
  { id: 'right-oval', speed: 102, phase: 0.33 },
  { id: 'bottom-left', speed: 98, phase: 0.66 },
];

const buildTrailPath = (points: Array<{ x: number; y: number }>) => {
  if (points.length === 0) {
    return '';
  }
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }
  return `M ${points[0].x} ${points[0].y} ${points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ')}`;
};

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

function createStreaks(
  width: number,
  height: number,
  count = 14
): StreakItem[] {
  const streaks: StreakItem[] = [];

  for (let i = 0; i < count; i += 1) {
    const direction: StreakItem['direction'] = Math.random() > 0.5 ? 'ltr' : 'rtl';
    streaks.push({
      x:
        direction === 'ltr'
          ? randomBetween(-width * 0.25, width * 0.9)
          : randomBetween(width * 0.2, width * 1.25),
      y: randomBetween(-height * 0.35, height * 0.78),
      angle:
        direction === 'ltr'
          ? randomBetween(0.66, 0.9)
          : randomBetween(Math.PI - 0.9, Math.PI - 0.66),
      direction,
      length: randomBetween(180, 320),
      speed: randomBetween(20, 38),
      tailOpacity: randomBetween(0.1, 0.2),
      headOpacity: randomBetween(0.58, 0.9),
      lineWidth: randomBetween(0.7, 1.2),
    });
  }

  return streaks;
}

const AnimatedTechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let width = 1;
    let height = 1;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let lastTimestamp = 0;

    let streaks: StreakItem[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      streaks = createStreaks(width, height);
    };

    const drawBackground = () => {
      const base = ctx.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, '#030406');
      base.addColorStop(0.55, '#020307');
      base.addColorStop(1, '#030406');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.25,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.78
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.52)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStreak = (streak: StreakItem) => {
      const headX = streak.x + Math.cos(streak.angle) * streak.length;
      const headY = streak.y + Math.sin(streak.angle) * streak.length;
      const peakOpacity = Math.min(
        0.36,
        streak.tailOpacity * 1.65 + streak.headOpacity * 0.06
      );

      const trail = ctx.createLinearGradient(streak.x, streak.y, headX, headY);
      trail.addColorStop(0, 'rgba(110,255,96,0)');
      trail.addColorStop(0.18, `rgba(102,255,88,${peakOpacity * 0.12})`);
      trail.addColorStop(0.36, `rgba(108,255,96,${peakOpacity * 0.28})`);
      trail.addColorStop(0.54, `rgba(116,255,102,${peakOpacity * 0.46})`);
      trail.addColorStop(0.72, `rgba(124,255,110,${peakOpacity * 0.66})`);
      trail.addColorStop(0.86, `rgba(150,255,132,${peakOpacity * 0.82})`);
      trail.addColorStop(1, `rgba(186,255,162,${peakOpacity})`);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(streak.x, streak.y);
      ctx.lineTo(headX, headY);
      ctx.strokeStyle = trail;
      ctx.lineWidth = streak.lineWidth;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(112,255,108,${peakOpacity * 0.55})`;
      ctx.stroke();
      ctx.restore();
    };

    const updateStreaks = (deltaSec: number) => {
      for (const streak of streaks) {
        streak.x += Math.cos(streak.angle) * streak.speed * deltaSec;
        streak.y += Math.sin(streak.angle) * streak.speed * deltaSec;

        const isOut =
          streak.direction === 'ltr'
            ? streak.x > width + 240 || streak.y > height + 240
            : streak.x < -240 || streak.y > height + 240;

        if (isOut) {
          const direction: StreakItem['direction'] = Math.random() > 0.5 ? 'ltr' : 'rtl';
          streak.direction = direction;
          streak.x =
            direction === 'ltr'
              ? randomBetween(-width * 0.35, width * 0.8)
              : randomBetween(width * 0.2, width * 1.28);
          streak.y = randomBetween(-height * 0.4, height * 0.75);
          streak.angle =
            direction === 'ltr'
              ? randomBetween(0.66, 0.9)
              : randomBetween(Math.PI - 0.9, Math.PI - 0.66);
          streak.length = randomBetween(180, 320);
          streak.speed = randomBetween(20, 38);
          streak.tailOpacity = randomBetween(0.1, 0.2);
          streak.headOpacity = randomBetween(0.58, 0.9);
          streak.lineWidth = randomBetween(0.7, 1.2);
        }
      }
    };

    const render = () => {
      drawBackground();

      for (const streak of streaks) {
        drawStreak(streak);
      }
    };

    const animate = (timestamp: number) => {
      const deltaSec =
        lastTimestamp === 0
          ? 1 / 60
          : Math.min(0.05, Math.max(0.008, (timestamp - lastTimestamp) / 1000));
      lastTimestamp = timestamp;

      updateStreaks(deltaSec);
      render();
      animationRef.current = window.requestAnimationFrame(animate);
    };

    resize();
    render();
    animationRef.current = window.requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="maas-main-img__canvas"
      aria-hidden="true"
    />
  );
};

const MaasMainImg: React.FC = () => {
  const { t } = useTranslation();
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [decorTrailStates, setDecorTrailStates] = useState<DecorTrailState[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const decorPathRefs = useRef<Record<DecorTrailRouteId, SVGGeometryElement | null>>({
    'top-left': null,
    'right-oval': null,
    'bottom-left': null,
  });
  const typewriterTexts = useMemo(
    () => (t('maas.main.typewriter', { returnObjects: true }) as string[]) ?? [],
    [t]
  );

  useEffect(() => {
    const currentText = typewriterTexts[textIndex] ?? '';
    let timeoutId: number;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeoutId = window.setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, TYPE_SPEED_MS + Math.random() * TYPE_RANDOM_VARIANCE_MS);
      } else {
        timeoutId = window.setTimeout(() => {
          setIsDeleting(true);
        }, HOLD_MS);
      }
    } else if (displayText.length > 0) {
      timeoutId = window.setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, DELETE_SPEED_MS);
    } else {
        timeoutId = window.setTimeout(() => {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % Math.max(1, typewriterTexts.length));
        }, NEXT_TEXT_DELAY_MS);
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayText, isDeleting, textIndex, typewriterTexts]);

  const openMessageBoard = () => setIsMessageOpen(true);
  const closeMessageBoard = () => setIsMessageOpen(false);

  useEffect(() => {
    let rafId = 0;
    let geometryRafId = 0;
    let lastTimestamp = 0;
    let elapsedMs = 0;

    type SegmentSample = {
      x: number;
      y: number;
      d: number;
      visible: boolean;
    };
    type RouteGeometry = {
      id: DecorTrailRouteId;
      samples: Array<{ x: number; y: number; d: number }>;
      totalDistance: number;
    };
    const routeGeometryRef: { current: Record<DecorTrailRouteId, RouteGeometry | null> } = {
      current: { 'top-left': null, 'right-oval': null, 'bottom-left': null },
    };
    const getPointAtDistance = (samples: Array<{ x: number; y: number; d: number }>, targetDistance: number) => {
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
    const buildVisibleGeometry = (id: DecorTrailRouteId, path: SVGGeometryElement, sectionRect: DOMRect): RouteGeometry | null => {
      const matrix = path.getScreenCTM();
      if (!matrix) {
        return null;
      }
      const totalLength = path.getTotalLength();
      if (!Number.isFinite(totalLength) || totalLength <= 0) {
        return null;
      }
      const sampleCount = 720;
      const rawSamples: SegmentSample[] = Array.from({ length: sampleCount }, (_, index) => {
        const lengthAt = (totalLength * index) / sampleCount;
        const point = path.getPointAtLength(lengthAt);
        const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix);
        return {
          x: screenPoint.x - sectionRect.left,
          y: screenPoint.y - sectionRect.top,
          d: 0,
          visible:
            screenPoint.x >= sectionRect.left &&
            screenPoint.x <= sectionRect.right &&
            screenPoint.y >= sectionRect.top &&
            screenPoint.y <= sectionRect.bottom,
        };
      });

      let bestStart = 0;
      let bestLength = 0;
      let runStart = -1;
      let runLength = 0;
      for (let i = 0; i < sampleCount * 2; i += 1) {
        if (rawSamples[i % sampleCount].visible) {
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
      if (bestLength < 6) {
        return null;
      }

      const segmentLength = Math.min(bestLength, sampleCount);
      const segment = Array.from({ length: segmentLength }, (_, offset) => rawSamples[(bestStart + offset) % sampleCount]);
      const normalizedSamples: Array<{ x: number; y: number; d: number }> = [{ x: segment[0].x, y: segment[0].y, d: 0 }];
      let distance = 0;
      for (let i = 1; i < segment.length; i += 1) {
        const prev = segment[i - 1];
        const next = segment[i];
        distance += Math.hypot(next.x - prev.x, next.y - prev.y);
        normalizedSamples.push({ x: next.x, y: next.y, d: distance });
      }
      if (distance < 1) {
        return null;
      }
      return { id, samples: normalizedSamples, totalDistance: distance };
    };
    const refreshGeometry = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }
      const sectionRect = section.getBoundingClientRect();
      decorTrailRoutes.forEach((route) => {
        const path = decorPathRefs.current[route.id];
        routeGeometryRef.current[route.id] = path ? buildVisibleGeometry(route.id, path, sectionRect) : null;
      });
    };
    const scheduleGeometryRefresh = () => {
      if (geometryRafId) {
        window.cancelAnimationFrame(geometryRafId);
      }
      geometryRafId = window.requestAnimationFrame(refreshGeometry);
    };

    const tick = (timestamp: number) => {
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }
      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      elapsedMs += deltaSeconds * 1000;

      const section = sectionRef.current;
      if (!section) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      const nextStates = decorTrailRoutes
        .map((route) => {
          const geometry = routeGeometryRef.current[route.id];
          if (!geometry) {
            return null;
          }

          const baseProgress = ((elapsedMs * route.speed) / 1000 + geometry.totalDistance * route.phase) % geometry.totalDistance;
          const head = getPointAtDistance(geometry.samples, baseProgress);
          const tailLength = geometry.totalDistance * DECOR_TRAIL_TAIL_RATIO;
          const step = tailLength / Math.max(1, DECOR_TRAIL_POINT_COUNT - 1);
          const tail = Array.from({ length: DECOR_TRAIL_POINT_COUNT }, (_, index) => {
            const dist = Math.max(0, baseProgress - index * step);
            return getPointAtDistance(geometry.samples, dist);
          });

          return {
            id: route.id,
            head,
            tail,
          } satisfies DecorTrailState;
        })
        .filter((item): item is DecorTrailState => Boolean(item));

      setDecorTrailStates(nextStates);
      rafId = window.requestAnimationFrame(tick);
    };

    scheduleGeometryRefresh();
    window.addEventListener('resize', scheduleGeometryRefresh);
    window.addEventListener('scroll', scheduleGeometryRefresh, { passive: true });
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

  return (
    <section ref={sectionRef} className="maas-main-img">
      <div className="maas-main-img__bg">
        <AnimatedTechBackground />
        <div className="maas-main-img__decor" aria-hidden="true">
          <div className="maas-main-img__decor-item maas-main-img__decor-top-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="686" height="234" viewBox="0 0 686 234" fill="none">
              <path
                ref={(node) => {
                  decorPathRefs.current['top-left'] = node;
                }}
                className="maas-main-img__decor-shape maas-main-img__decor-shape--top-left"
                pathLength={1000}
                d="M683.085 -1L681.78 0.625977C566.134 144.694 322.019 264.085 -0.118164 225.754L-1 225.649V-1H683.085Z"
                fill="url(#maasMainImgTopFill)"
              />
              <defs>
                <linearGradient id="maasMainImgTopFill" x1="99.7%" y1="44.8%" x2="0.3%" y2="55.2%">
                  <stop stopColor="#021F17" />
                  <stop offset="1" stopColor="#101010" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="maas-main-img__decor-item maas-main-img__decor-right-oval">
            <svg width="240" height="473" viewBox="0 0 240 473" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                ref={(node) => {
                  decorPathRefs.current['right-oval'] = node;
                }}
                className="maas-main-img__decor-shape maas-main-img__decor-shape--right-oval"
                pathLength={1000}
                x="478.167"
                y="-57.9031"
                width="322"
                height="619"
                rx="161"
                transform="rotate(60 478.167 -57.9031)"
                fill="url(#maasMainImgRightFill)"
              />
              <defs>
                <linearGradient id="maasMainImgRightFill" x1="99.7%" y1="44.8%" x2="0.3%" y2="55.2%">
                  <stop stopColor="#021F17" />
                  <stop offset="1" stopColor="#101010" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="maas-main-img__decor-item maas-main-img__decor-bottom-left">
            <svg width="433" height="176" viewBox="0 0 433 176" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                ref={(node) => {
                  decorPathRefs.current['bottom-left'] = node;
                }}
                className="maas-main-img__decor-shape maas-main-img__decor-shape--bottom-left"
                pathLength={1000}
                x="157.134"
                y="-72.5369"
                width="402"
                height="619"
                rx="201"
                transform="rotate(30 157.134 -72.5369)"
                fill="url(#maasMainImgBottomFill)"
              />
              <defs>
                <linearGradient id="maasMainImgBottomFill" x1="99.7%" y1="44.8%" x2="0.3%" y2="55.2%">
                  <stop stopColor="#021F17" />
                  <stop offset="1" stopColor="#101010" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <svg className="maas-main-img__decor-trail-layer" aria-hidden>
          <defs>
            <filter id="maasMainDecorTrailBlur" x="-30" y="-30" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur stdDeviation="2.6" result="effect1_foregroundBlur_0_0" />
            </filter>
          </defs>
          {decorTrailStates.map((state) => (
            <g key={`decor-trail-${state.id}`}>
              {(() => {
                const trailPoints = [...state.tail].reverse();
                const trailPath = buildTrailPath(trailPoints);
                const tailStart = trailPoints[0] ?? state.head;
                const tailEnd = trailPoints[trailPoints.length - 1] ?? state.head;
                const gradientId = `maasMainDecorTrailGrad-${state.id}`;
                return (
                  <>
                    <defs>
                      <linearGradient id={gradientId} x1={tailStart.x} y1={tailStart.y} x2={tailEnd.x} y2={tailEnd.y} gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#D5FF7D" stopOpacity="0.02" />
                        <stop offset="0.46" stopColor="#D5FF7D" stopOpacity="0.2" />
                        <stop offset="0.8" stopColor="#D5FF7D" stopOpacity="0.48" />
                        <stop offset="1" stopColor="#E6FFC0" stopOpacity="0.82" />
                      </linearGradient>
                    </defs>
                    <path d={trailPath} className="maas-main-img__decor-trail-path maas-main-img__decor-trail-path--glow" />
                    <path d={trailPath} className="maas-main-img__decor-trail-path maas-main-img__decor-trail-path--core" stroke={`url(#${gradientId})`} />
                  </>
                );
              })()}
            </g>
          ))}
        </svg>
      </div>

      <div className="maas-main-img__content">
        <h1 className="maas-main-img__title">{t('maas.main.title')}</h1>
        <p className="maas-main-img__desc">
          {t('maas.main.desc')}
        </p>

        <div
          className="maas-main-img__input-wrap"
          role="button"
          tabIndex={0}
          onClick={openMessageBoard}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openMessageBoard();
            }
          }}
        >
          <span className="maas-main-img__input-icon" aria-hidden="true">
            <img src={getAssetPath('/images/maas/Frame_19.svg')} alt="" />
          </span>
          <span className="maas-main-img__input-text">
            {displayText}
            <span className="maas-main-img__cursor" aria-hidden="true" />
          </span>
          <button
            type="button"
            className="maas-main-img__input-btn"
            aria-label={t('maas.main.openMessageAria')}
            onClick={(event) => {
              event.stopPropagation();
              openMessageBoard();
            }}
          >
            <img src={getAssetPath('/images/maas/Vector_(Stroke).svg')} alt="" />
          </button>
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={closeMessageBoard} />
    </section>
  );
};

export default MaasMainImg;
