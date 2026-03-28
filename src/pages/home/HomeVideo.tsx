import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import { useScrollContext } from '../../contexts/ScrollContext';
import MessageBoard from '../MessageBoard';
import CTAButton from '../../components/common/CTAButton';
import './HomeVideo.css';

const VIDEO_SRC = getAssetPath('/videos/home/home_video.mp4');
const POSTER_SRC = getAssetPath('/images/home/video-poster-first-frame.png');
const DESKTOP_TITLE_VIEWPORT_TOP = 170;
const MOBILE_TITLE_VIEWPORT_TOP = 120;
const TITLE_FADE_TRIGGER_AFTER_GITHUB_TOP_PX = 20;

function getTitleViewportTop() {
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return MOBILE_TITLE_VIEWPORT_TOP;
  }
  return DESKTOP_TITLE_VIEWPORT_TOP;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const HomeVideo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasPrimedCoverRef = useRef(false);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const githubLabelRef = useRef<HTMLParagraphElement | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoStartBase, setVideoStartBase] = useState(440);
  const [githubLabelOffsetTop, setGithubLabelOffsetTop] = useState(0);
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

    const ctaWrap = ctaWrapRef.current;
    const githubLabel = githubLabelRef.current;
    if (!ctaWrap) return;

    const titleViewportTop = getTitleViewportTop();
    const nextVideoStartBase = Math.round(titleViewportTop + ctaWrap.offsetTop + ctaWrap.offsetHeight + 64);
    setVideoStartBase((prev) => (Math.abs(prev - nextVideoStartBase) >= 1 ? nextVideoStartBase : prev));
    if (githubLabel) {
      const nextGithubLabelOffsetTop = Math.round(githubLabel.offsetTop);
      setGithubLabelOffsetTop((prev) => (Math.abs(prev - nextGithubLabelOffsetTop) >= 1 ? nextGithubLabelOffsetTop : prev));
    }
  }, [setVideoFullscreen, setVideoProgress]);

  useLayoutEffect(() => {
    handleScroll();
  }, [handleScroll, i18n.language]);

  useEffect(() => {
    let rafId: number | null = null;
    const schedule = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(() => {
          rafId = null;
          handleScroll();
        });
      }
    };

    const onScroll = () => schedule();
    const onResize = () => schedule();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    schedule();

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [handleScroll, i18n.language]);

  const phase1 = clamp(progress / 0.6, 0, 1);
  const isVideoFullyFilled = phase1 >= 0.999;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Keep the hero video muted for the entire lifecycle.
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;

    const primeVideoCover = async () => {
      if (hasPrimedCoverRef.current) return;
      hasPrimedCoverRef.current = true;

      try {
        await video.play();
        video.pause();
        video.currentTime = 0;
      } catch {
        hasPrimedCoverRef.current = false;
      }
    };

    if (isVideoFullyFilled) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
    void primeVideoCover();
  }, [isVideoFullyFilled]);

  const videoInset = lerp(5, 0, phase1);
  const videoRadius = lerp(24, 0, phase1);

  const ctaOpacity = clamp(1 - phase1 * 2, 0, 1);
  const titleViewportTop = getTitleViewportTop();
  const videoStartTop = videoStartBase;
  const videoTopOffset = lerp(videoStartTop, 0, phase1);
  const titleWhiteClipTop = Math.max(0, videoTopOffset - titleViewportTop);
  const titleFadeStartVideoTop = Math.max(0, titleViewportTop + githubLabelOffsetTop - TITLE_FADE_TRIGGER_AFTER_GITHUB_TOP_PX);
  const titleFadeProgress = titleFadeStartVideoTop > 0
    ? clamp((titleFadeStartVideoTop - videoTopOffset) / titleFadeStartVideoTop, 0, 1)
    : phase1;
  const titleTextOpacity = clamp(1 - titleFadeProgress, 0, 1);

  return (
    <section ref={sectionRef} className="home-video-section">
      <div ref={stickyRef} className="home-video-sticky">
        <div className="home-video-title-layer">
          <div className="home-video-title-text-wrap" style={{ opacity: titleTextOpacity }}>
            <div className="home-video-title-text-layer home-video-title-text-layer--base">
              <p className="home-video-github-label" ref={githubLabelRef}>
                160.6k stars on <a href="https://github.com">GitHub</a>
              </p>
              <h2 className="home-video-title">
                {t('home.video.title')}
              </h2>
            </div>
            <div
              className="home-video-title-text-layer home-video-title-text-layer--inverse"
              style={{ clipPath: `inset(${titleWhiteClipTop}px 0 0 0)` }}
              aria-hidden="true"
            >
              <p className="home-video-github-label">
                160.6k stars on <a>GitHub</a>
              </p>
              <h2 className="home-video-title">
                {t('home.video.title')}
              </h2>
            </div>
          </div>
          <div
            className="home-video-cta-wrap"
            ref={ctaWrapRef}
            style={{ opacity: ctaOpacity, pointerEvents: ctaOpacity < 0.1 ? 'none' : 'auto' }}
          >
            <CTAButton className="home-video-cta" onClick={() => setIsMessageOpen(true)} />
          </div>
        </div>

        <div
          className="home-video-frame"
          style={{
            top: `${videoTopOffset}px`,
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
            muted
            playsInline
            preload="auto"
            loop
          >
            {t('home.video.videoUnsupported')}
          </video>
          {/* <div className="home-video-play-btn" style={{ opacity: playBtnOpacity }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.9)" />
              <path d="M20 16L34 24L20 32V16Z" fill="#0f172a" />
            </svg>
          </div> */}
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default HomeVideo;
