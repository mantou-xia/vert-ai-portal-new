import React, { useRef, useState } from 'react';
import './HomeVideo.css';

const HomeVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="home-video-section">
      <div className="home-video-inner">
        <div className="home-video-header">
          <div className="home-video-subtitle">
            160.6k stars on <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <h2 className="home-video-title">打造企业级数字员工孵化平台</h2>
          <button
            className="home-video-cta"
            type="button"
          >
            立即开始
          </button>
        </div>

        <div className="home-video-card">
          <div className="home-video-frame">
            <video
              ref={videoRef}
              className="home-video-element"
              src="/videos/home/home_video.mp4"
              controls
              poster="/images/home/video-poster.png"
            >
              您的浏览器不支持视频播放。
            </video>
            {!isPlaying && (
              <button
                type="button"
                className="home-video-play-overlay"
                onClick={handlePlayClick}
              >
                <span className="home-video-play-button">
                  <span className="home-video-play-icon">▶</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeVideo;
