import React, { useEffect, useRef, useState } from 'react';
import MessageBoard from '../MessageBoard';
import { getAssetPath } from '../../utils/path';
import './MaasMainImg.css';

const TYPEWRITER_TEXTS = [
  '帮我分析近一周的采购订单的规模',
  '帮我自动整理桌面上的所有文件，并进行自动归类',
  '把库存异常与补货建议整理成可执行清单',
];

const TYPE_SPEED_MS = 80;
const DELETE_SPEED_MS = 40;
const HOLD_MS = 1500;
const NEXT_TEXT_DELAY_MS = 500;
const TYPE_RANDOM_VARIANCE_MS = 50;

type ArcItem = {
  baseX: number;
  baseY: number;
  rx: number;
  ry: number;
  rotation: number;
  driftX: number;
  driftY: number;
  phase: number;
  floatSpeed: number;
  strokeWidth: number;
  strokeColor: string;
};

type StreakItem = {
  x: number;
  y: number;
  angle: number;
  length: number;
  speed: number;
  tailOpacity: number;
  headOpacity: number;
  lineWidth: number;
};

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

function createArcs(width: number, height: number): ArcItem[] {
  return [
    {
      baseX: width * 0.02,
      baseY: -height * 0.1,
      rx: Math.max(280, width * 0.28),
      ry: Math.max(180, height * 0.35),
      rotation: 0.08,
      driftX: 10,
      driftY: 7,
      phase: 0.2,
      floatSpeed: 0.22,
      strokeWidth: 1.5,
      strokeColor: 'rgba(170,255,50,0.9)',
    },
    {
      baseX: width + width * 0.035,
      baseY: height * 0.42,
      rx: Math.max(120, width * 0.1),
      ry: Math.max(140, height * 0.23),
      rotation: -0.25,
      driftX: 7,
      driftY: 5,
      phase: 1.5,
      floatSpeed: 0.18,
      strokeWidth: 1.35,
      strokeColor: 'rgba(168,255,48,0.82)',
    },
    {
      baseX: width * 0.08,
      baseY: height + height * 0.12,
      rx: Math.max(160, width * 0.15),
      ry: Math.max(130, height * 0.22),
      rotation: 0.33,
      driftX: 8,
      driftY: 6,
      phase: 2.3,
      floatSpeed: 0.2,
      strokeWidth: 1.3,
      strokeColor: 'rgba(168,255,48,0.78)',
    },
  ];
}

function createStreaks(
  width: number,
  height: number,
  count = 14
): StreakItem[] {
  const streaks: StreakItem[] = [];

  for (let i = 0; i < count; i += 1) {
    streaks.push({
      x: randomBetween(-width * 0.25, width * 0.9),
      y: randomBetween(-height * 0.35, height * 0.78),
      angle: randomBetween(0.66, 0.9),
      length: randomBetween(110, 220),
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

    let arcs: ArcItem[] = [];
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
      arcs = createArcs(width, height);
      streaks = createStreaks(width, height);
    };

    const drawBackground = () => {
      const base = ctx.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, '#030406');
      base.addColorStop(0.55, '#020307');
      base.addColorStop(1, '#030406');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      const glowTopLeft = ctx.createRadialGradient(
        width * 0.06,
        height * 0.06,
        0,
        width * 0.06,
        height * 0.06,
        Math.max(width * 0.42, height * 0.56)
      );
      glowTopLeft.addColorStop(0, 'rgba(0,102,70,0.3)');
      glowTopLeft.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowTopLeft;
      ctx.fillRect(0, 0, width, height);

      const glowRight = ctx.createRadialGradient(
        width * 0.96,
        height * 0.44,
        0,
        width * 0.96,
        height * 0.44,
        Math.max(width * 0.25, height * 0.42)
      );
      glowRight.addColorStop(0, 'rgba(0,120,80,0.24)');
      glowRight.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowRight;
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

    const drawArc = (arc: ArcItem, timeSec: number) => {
      const x =
        arc.baseX + Math.sin(timeSec * arc.floatSpeed + arc.phase) * arc.driftX;
      const y =
        arc.baseY + Math.cos(timeSec * arc.floatSpeed + arc.phase) * arc.driftY;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(arc.rotation);

      ctx.beginPath();
      ctx.ellipse(0, 0, arc.rx, arc.ry, 0, 0, Math.PI * 2);
      ctx.lineWidth = arc.strokeWidth;
      ctx.strokeStyle = arc.strokeColor;
      ctx.stroke();

      ctx.restore();
    };

    const drawStreak = (streak: StreakItem) => {
      const headX = streak.x + Math.cos(streak.angle) * streak.length;
      const headY = streak.y + Math.sin(streak.angle) * streak.length;

      const trail = ctx.createLinearGradient(streak.x, streak.y, headX, headY);
      trail.addColorStop(0, 'rgba(110,255,96,0)');
      trail.addColorStop(
        0.55,
        `rgba(102,255,88,${streak.tailOpacity * 0.4})`
      );
      trail.addColorStop(0.88, `rgba(120,255,104,${streak.tailOpacity})`);
      trail.addColorStop(0.97, `rgba(198,255,170,${streak.headOpacity * 0.8})`);
      trail.addColorStop(1, `rgba(232,255,214,${streak.headOpacity})`);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(streak.x, streak.y);
      ctx.lineTo(headX, headY);
      ctx.strokeStyle = trail;
      ctx.lineWidth = streak.lineWidth;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(112,255,108,${streak.tailOpacity})`;
      ctx.stroke();
      ctx.restore();
    };

    const updateStreaks = (deltaSec: number) => {
      for (const streak of streaks) {
        streak.x += Math.cos(streak.angle) * streak.speed * deltaSec;
        streak.y += Math.sin(streak.angle) * streak.speed * deltaSec;

        if (streak.x > width + 240 || streak.y > height + 240) {
          streak.x = randomBetween(-width * 0.35, width * 0.8);
          streak.y = randomBetween(-height * 0.4, height * 0.75);
          streak.length = randomBetween(110, 220);
          streak.speed = randomBetween(20, 38);
          streak.tailOpacity = randomBetween(0.1, 0.2);
          streak.headOpacity = randomBetween(0.58, 0.9);
          streak.lineWidth = randomBetween(0.7, 1.2);
          streak.angle = randomBetween(0.66, 0.9);
        }
      }
    };

    const render = (timeSec: number) => {
      drawBackground();

      for (const streak of streaks) {
        drawStreak(streak);
      }

      for (const arc of arcs) {
        drawArc(arc, timeSec);
      }
    };

    const animate = (timestamp: number) => {
      const deltaSec =
        lastTimestamp === 0
          ? 1 / 60
          : Math.min(0.05, Math.max(0.008, (timestamp - lastTimestamp) / 1000));
      lastTimestamp = timestamp;

      updateStreaks(deltaSec);
      render(timestamp / 1000);
      animationRef.current = window.requestAnimationFrame(animate);
    };

    resize();
    render(0);
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
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  useEffect(() => {
    const currentText = TYPEWRITER_TEXTS[textIndex];
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
        setTextIndex((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
      }, NEXT_TEXT_DELAY_MS);
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayText, isDeleting, textIndex]);

  const openMessageBoard = () => setIsMessageOpen(true);
  const closeMessageBoard = () => setIsMessageOpen(false);

  return (
    <section className="maas-main-img">
      <div className="maas-main-img__bg">
        <AnimatedTechBackground />
      </div>

      <div className="maas-main-img__content">
        <h1 className="maas-main-img__title">无需增加额外预算，即可扩大影响力</h1>
        <p className="maas-main-img__desc">
          由VERT提供支持，以人工智能的速度为您配备专家级的精准能力。
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
            aria-label="打开留言面板"
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
