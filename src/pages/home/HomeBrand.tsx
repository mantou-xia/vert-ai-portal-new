import React, { useEffect, useRef } from 'react';
import { getAssetPath } from '../../utils/path';
import './HomeBrand.css';

type BrandConfig = {
  key: string;
  name: string;
  logo: string;
  frameWidth: number;
  frameHeight: number;
  logoWidth: number;
  logoHeight: number;
  opacity: number;
  radius?: number;
  background?: string;
};

const BRANDS: BrandConfig[] = [
  {
    key: 'yitoa',
    name: 'Yitoa',
    logo: '/images/home/英唐.png',
    frameWidth: 201.143,
    frameHeight: 64,
    logoWidth: 169.57,
    logoHeight: 49.87,
    opacity: 0.8,
    radius: 13.299,
  },
  {
    key: 'uas',
    name: 'UAS',
    logo: '/images/home/uas.png',
    frameWidth: 108,
    frameHeight: 64,
    logoWidth: 72,
    logoHeight: 26,
    opacity: 0.8,
    radius: 10,
  },
  {
    key: 'yijian',
    name: 'EJC',
    logo: '/images/home/易建采.png',
    frameWidth: 94,
    frameHeight: 52,
    logoWidth: 85.22,
    logoHeight: 51.89,
    opacity: 1,
    radius: 8.75,
    background: '#ffffff',
  },
  {
    key: 'nuaa',
    name: 'NUAA',
    logo: '/images/home/南京航空航天大学.png',
    frameWidth: 206,
    frameHeight: 56,
    logoWidth: 206,
    logoHeight: 56,
    opacity: 0.6,
  },
  {
    key: 'daoying',
    name: 'Daoying',
    logo: '/images/home/道影.png',
    frameWidth: 159.586,
    frameHeight: 52,
    logoWidth: 159.586,
    logoHeight: 52,
    opacity: 0.7,
    radius: 6.853,
  },
];

const SCROLL_SPEED = 1.2;

const HomeBrand: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const listWidthRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const list = track.querySelector<HTMLElement>('.home-brand__list');
      if (list && listWidthRef.current === 0) {
        listWidthRef.current = list.offsetWidth;
      }
      const listWidth = listWidthRef.current;

      if (listWidth > 0) {
        offsetRef.current -= SCROLL_SPEED;
        if (offsetRef.current <= -listWidth) {
          offsetRef.current += listWidth;
        }
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="home-brand">
      <div ref={viewportRef} className="home-brand__viewport">
        <div ref={trackRef} className="home-brand__track">
          {[0, 1, 2].map((setIdx) => (
            <div key={setIdx} className="home-brand__list" aria-hidden={setIdx > 0}>
              {BRANDS.map((brand) => (
                <div
                  key={`${setIdx}-${brand.key}`}
                  className="home-brand__item"
                  style={
                    {
                      '--frame-width': `${brand.frameWidth}px`,
                      '--frame-height': `${brand.frameHeight}px`,
                      '--frame-radius': `${brand.radius ?? 0}px`,
                      '--logo-width': `${brand.logoWidth}px`,
                      '--logo-height': `${brand.logoHeight}px`,
                      '--item-opacity': brand.opacity,
                      '--frame-bg': brand.background ?? 'transparent',
                    } as React.CSSProperties
                  }
                >
                  <img
                    className="home-brand__logo"
                    src={getAssetPath(brand.logo)}
                    alt={brand.name}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBrand;
