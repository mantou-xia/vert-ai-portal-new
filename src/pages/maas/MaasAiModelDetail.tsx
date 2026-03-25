import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './MaasAiModelDetail.css';

type RouterCard = {
  key: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type LocalizedRouterCard = Omit<RouterCard, 'image'>;

const ROUTER_CARD_IMAGES: Record<string, string> = {
  api: '/images/maas/image_mass_1.png',
  cost: '/images/maas/image_mass_2.png',
  availability: '/images/maas/image_mass_3.png',
  local: '/images/maas/image_mass_4.png',
  landing: '/images/maas/image_mass_5.png',
  'web-search': '/images/maas/image_mass_6.png',
  mcp: '/images/maas/image_mass_7.png',
  rag: '/images/maas/image_mass_5.png',
  'fine-tuning': '/images/maas/image_mass_1.png',
};

const MaasAiModelDetail: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchStartScrollRef = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCenteredLayout, setIsCenteredLayout] = useState(false);
  const routerCards = useMemo<RouterCard[]>(
    () =>
      (t('maas.aiModelDetail.cards', { returnObjects: true }) as LocalizedRouterCard[]).map((card) => ({
        ...card,
        image: ROUTER_CARD_IMAGES[card.key] ?? ROUTER_CARD_IMAGES.api,
      })),
    [t]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    if (isCenteredLayout) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      if (maxScrollLeft <= 0) {
        return;
      }

      const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
      if (delta === 0) {
        return;
      }

      const atStart = viewport.scrollLeft <= 1;
      const atEnd = viewport.scrollLeft >= maxScrollLeft - 1;

      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) {
        return;
      }

      event.preventDefault();
      viewport.scrollLeft = Math.max(0, Math.min(viewport.scrollLeft + delta, maxScrollLeft));
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [isCenteredLayout]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) {
      return;
    }

    const updateLayoutMode = () => {
      const cards = Array.from(list.querySelectorAll<HTMLElement>('.maas-ai-model-detail__card'));
      if (cards.length === 0) {
        setIsCenteredLayout(false);
        return;
      }

      const listStyle = window.getComputedStyle(list);
      const gapValue = listStyle.columnGap || listStyle.gap || '0';
      const gap = Number.parseFloat(gapValue) || 0;
      const cardsWidth = cards.reduce((sum, card) => sum + card.offsetWidth, 0);
      const totalCardsWidth = cardsWidth + gap * Math.max(0, cards.length - 1);
      const canCenter = totalCardsWidth <= viewport.clientWidth;

      setIsCenteredLayout((prev) => (prev === canCenter ? prev : canCenter));
    };

    updateLayoutMode();

    const resizeObserver = new ResizeObserver(updateLayoutMode);
    resizeObserver.observe(viewport);
    resizeObserver.observe(list);

    return () => resizeObserver.disconnect();
  }, [routerCards.length]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || isCenteredLayout) {
      return;
    }

    setIsDragging(true);
    dragStartXRef.current = event.pageX;
    dragStartScrollRef.current = viewport.scrollLeft;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !viewportRef.current || isCenteredLayout) {
      return;
    }

    event.preventDefault();
    const delta = event.pageX - dragStartXRef.current;
    viewportRef.current.scrollLeft = dragStartScrollRef.current - delta;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || event.touches.length === 0 || isCenteredLayout) {
      return;
    }

    touchStartXRef.current = event.touches[0].clientX;
    touchStartScrollRef.current = viewport.scrollLeft;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || event.touches.length === 0 || isCenteredLayout) {
      return;
    }

    const delta = event.touches[0].clientX - touchStartXRef.current;
    viewport.scrollLeft = touchStartScrollRef.current - delta;
  };

  return (
    <section
      ref={sectionRef}
      className={`maas-ai-model-detail ${isVisible ? 'maas-ai-model-detail--visible' : ''}`}
      aria-label={t('maas.aiModelDetail.ariaLabel')}
    >
      <div className="maas-ai-model-detail__inner">
        <header className="maas-ai-model-detail__header">
          <h2 className="maas-ai-model-detail__title">{t('maas.aiModelDetail.title')}</h2>
        </header>

        <div
          ref={viewportRef}
          className={`maas-ai-model-detail__viewport ${isDragging ? 'maas-ai-model-detail__viewport--dragging' : ''} ${isCenteredLayout ? 'maas-ai-model-detail__viewport--centered' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            ref={listRef}
            className={`maas-ai-model-detail__list ${isCenteredLayout ? 'maas-ai-model-detail__list--centered' : ''}`}
            role="list"
          >
            {routerCards.map((card, index) => (
              <article
                key={card.key}
                className="maas-ai-model-detail__card"
                style={{ '--card-index': index } as React.CSSProperties}
                role="listitem"
              >
                <div className="maas-ai-model-detail__card-image-wrap">
                  <img
                    className="maas-ai-model-detail__card-image"
                    src={getAssetPath(card.image)}
                    alt={card.imageAlt}
                    draggable={false}
                  />
                </div>
                <div className="maas-ai-model-detail__card-content">
                  <h3 className="maas-ai-model-detail__card-title">{card.title}</h3>
                  <p className="maas-ai-model-detail__card-desc">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaasAiModelDetail;
