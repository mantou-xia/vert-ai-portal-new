import React, { useRef, useState, useCallback, useEffect } from 'react';
import './HomeBrand.css';

const BRANDS = [
  { name: 'TOA 英腾', key: 'toa' },
  { name: '金鹰 GOLDEN EAGLE', key: 'jinying' },
  { name: 'SKIEER 数阅®', key: 'skieber' },
  { name: 'ÆON', key: 'aeon' },
  { name: '7-ELEVEN', key: '7eleven' },
  { name: 'Gmart 金鹰', key: 'gmart' },
];

const SCROLL_SPEED = 1; // px per frame

const HomeBrand: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const autoScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || isDragging) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    let next = el.scrollLeft + SCROLL_SPEED;
    if (next >= maxScroll / 2) next -= maxScroll / 2;
    el.scrollLeft = next;
    rafRef.current = requestAnimationFrame(autoScroll);
  }, [isDragging]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoScroll]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStart(trackRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !trackRef.current) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      const next = scrollStart - dx;
      const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      trackRef.current.scrollLeft = Math.max(0, Math.min(next, maxScroll));
    },
    [isDragging, startX, scrollStart]
  );

  const handleMouseUp = useCallback(() => {
    const el = trackRef.current;
    if (el) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const half = maxScroll / 2;
      if (half > 0 && el.scrollLeft >= half) {
        el.scrollLeft = el.scrollLeft - half;
      }
    }
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  return (
    <section className="home-brand">
      <div className="home-brand__inner">
        <div
          ref={trackRef}
          className={`home-brand__track ${isDragging ? 'home-brand__track--dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="home-brand__list">
            {BRANDS.map((brand) => (
              <div key={brand.key} className="home-brand__item">
                <span className="home-brand__name">{brand.name}</span>
              </div>
            ))}
          </div>
          <div className="home-brand__list" aria-hidden="true">
            {BRANDS.map((brand) => (
              <div key={`dup-${brand.key}`} className="home-brand__item">
                <span className="home-brand__name">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBrand;
