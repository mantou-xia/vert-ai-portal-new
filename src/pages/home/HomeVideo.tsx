import React, { useRef, useState, useEffect, useCallback } from 'react';
import { getAssetPath } from '../../utils/path';
import { useScrollContext } from '../../contexts/ScrollContext';
import MessageBoard from '../MessageBoard';
import CTAButton from '../../components/common/CTAButton';
import './HomeVideo.css';

const VIDEO_SRC = getAssetPath('/videos/home/home_video.mp4');
const POSTER_SRC = getAssetPath('/images/home/video-poster.png');

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const HomeVideo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setVideoFullscreen, setVideoProgress } = useScrollContext();

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -rect.top;
    const maxScroll = sectionHeight - viewportHeight;
    if (maxScroll <= 0) return;
    const p = clamp(scrolled / maxScroll, 0, 1);
    setProgress(p);
    setVideoProgress(p);
    setVideoFullscreen(p >= 0.92);
  }, [setVideoFullscreen, setVideoProgress]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Phase 1 (0~0.6): video moves up from below title and scales up
  const phase1 = clamp(progress / 0.6, 0, 1);
  // Phase 2 (0.6~1.0): video continues to fill screen, title color changes
  const phase2 = clamp((progress - 0.6) / 0.4, 0, 1);

  // Video card: starts smaller with margin, ends fullscreen
  const videoInset = lerp(5, 0, phase1);        // % inset from edges
  const videoTopOffset = lerp(45, 0, phase1);    // % offset from top (below title)
  const videoRadius = lerp(24, 0, phase1);       // border-radius

  const colorT = clamp(phase1 * 0.5 + phase2 * 0.5, 0, 1);
  const r = Math.round(lerp(26, 255, colorT));
  const g = Math.round(lerp(26, 255, colorT));
  const b = Math.round(lerp(26, 255, colorT));
  const titleColor = `rgb(${r},${g},${b})`;

  const githubLinkColor = `rgb(${Math.round(lerp(45, 255, colorT))},${Math.round(lerp(108, 255, colorT))},${Math.round(lerp(255, 255, colorT))})`;

  const ctaOpacity = clamp(1 - phase1 * 2, 0, 1);

  const labelOpacity = clamp(1 - phase1 * 1.5, 0, 1);

  // Play button on video
  const playBtnOpacity = clamp(1 - phase1 * 2, 0, 1);

  // Shift title layer up in initial state, settle at natural position when sticky kicks in
  const titleLayerY = lerp(-90, 0, clamp(progress / 0.15, 0, 1));

  return (
    <section ref={sectionRef} className="home-video-section">
      <div className="home-video-sticky">
        {/* Title layer - stays centered, z above video */}
        <div className="home-video-title-layer" style={{ transform: `translateY(${titleLayerY}px)` }}>
          <p
            className="home-video-github-label"
            style={{ opacity: labelOpacity, color: titleColor }}
          >
            160.6k stars on <a href="https://github.com" style={{ color: githubLinkColor }}>GitHub</a>
          </p>
          <h2
            className="home-video-title"
            style={{ color: titleColor }}
          >
            打造企业级数字员工孵化平台
          </h2>
          <div
            className="home-video-cta-wrap"
            style={{ opacity: ctaOpacity, pointerEvents: ctaOpacity < 0.1 ? 'none' : 'auto' }}
          >
            <CTAButton
              className="home-video-cta"
              onClick={() => setIsMessageOpen(true)}
            />
          </div>
        </div>

        {/* Video frame - starts below title as card, grows to fullscreen */}
        <div
          className="home-video-frame"
          style={{
            top: `${videoTopOffset}%`,
            left: `${videoInset}%`,
            right: `${videoInset}%`,
            bottom: '0',
            borderRadius: `${videoRadius}px`,
          }}
        >
          <video
            ref={videoRef}
            className="home-video-element"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            playsInline
            loop
          >
            您的浏览器不支持视频播放。
          </video>
          {/* Play button overlay */}
          <div
            className="home-video-play-btn"
            style={{ opacity: playBtnOpacity }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.9)" />
              <path d="M20 16L34 24L20 32V16Z" fill="#0f172a" />
            </svg>
          </div>
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default HomeVideo;
