import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './PdeStudiesDetail.css';

const EASE = [0.16, 1, 0.3, 1] as const;
const DETAIL_CARD_WIDTH = 576;
const DETAIL_CARD_GAP = 16;
const DETAIL_CARD_COUNT = 3;
const DETAIL_TOTAL_WIDTH = DETAIL_CARD_WIDTH * DETAIL_CARD_COUNT + DETAIL_CARD_GAP * (DETAIL_CARD_COUNT - 1);

type DetailCard = {
  key: string;
  title: string;
  tag: string;
  pain: string;
  aiService: string;
  coreValue: string;
  image: string;
  isAudit?: boolean;
};

const DETAIL_CARD_IMAGES: Record<string, string> = {
  service: getAssetPath('/images/icons/fde/image_1.png'),
  legal: getAssetPath('/images/icons/fde/image_2.png'),
  audit: getAssetPath('/images/icons/fde/image_3.png'),
};

function parseHighlight(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<React.Fragment key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</React.Fragment>);
    }
    parts.push(
      <span key={`h-${key++}`} className="pde-studies-detail__highlight">
        {match[1]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<React.Fragment key={`t-${key++}`}>{text.slice(lastIndex)}</React.Fragment>);
  }
  return parts.length > 0 ? <>{parts}</> : text;
}

const PdeStudiesDetail: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [canCenterAllCards, setCanCenterAllCards] = useState(false);
  const hasPlayed = useRef(false);
  const detailCards = useMemo(
    () =>
      (t('fde.studiesDetail.cards', { returnObjects: true }) as Omit<DetailCard, 'image'>[]).map((card) => ({
        ...card,
        image: DETAIL_CARD_IMAGES[card.key] ?? DETAIL_CARD_IMAGES.service,
      })),
    [t]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const updateFitState = () => {
      setCanCenterAllCards(el.clientWidth >= DETAIL_TOTAL_WIDTH);
    };

    updateFitState();
    const resizeObserver = new ResizeObserver(updateFitState);
    resizeObserver.observe(el);
    window.addEventListener('resize', updateFitState);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateFitState);
    };
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const handleMouseMove = (event: MouseEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState.active) return;
      const deltaX = event.clientX - dragState.startX;
      inner.scrollLeft = dragState.startScrollLeft - deltaX;
      event.preventDefault();
    };

    const handleMouseUp = () => {
      if (!dragStateRef.current.active) return;
      dragStateRef.current.active = false;
      inner.classList.remove('is-dragging');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    if (!canCenterAllCards) return;
    dragStateRef.current.active = false;
    inner.classList.remove('is-dragging');
    inner.scrollLeft = 0;
  }, [canCenterAllCards]);

  const handleInnerMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if (canCenterAllCards) return;
    const inner = innerRef.current;
    if (!inner) return;
    dragStateRef.current.active = true;
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startScrollLeft = inner.scrollLeft;
    inner.classList.add('is-dragging');
  };

  return (
    <section ref={sectionRef} className="pde-studies-detail">
      <div
        ref={innerRef}
        className={[
          'pde-studies-detail__inner',
          canCenterAllCards ? 'pde-studies-detail__inner--fit-all' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onMouseDown={handleInnerMouseDown}
      >
        {detailCards.map((card, index) => (
          <motion.article
            key={card.key}
            tabIndex={0}
            className={[
              'pde-studies-detail__card',
              card.isAudit ? 'pde-studies-detail__card--audit' : '',
              card.key !== 'service' ? 'pde-studies-detail__card--wide-tag' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            initial={{ y: '33.333%', opacity: 0 }}
            animate={hasAnimated ? { y: '0%', opacity: 1 } : { y: '33.333%', opacity: 0 }}
            transition={{
              y: { duration: 1, ease: EASE },
              opacity: { duration: 0.5, ease: EASE },
              delay: index * 0.1,
            }}
          >
            <div className="pde-studies-detail__content">
              <h3 className="pde-studies-detail__title">{card.title}</h3>
              <div className="pde-studies-detail__pain">
                <span className="pde-studies-detail__tag">{card.tag}</span>
                <p className="pde-studies-detail__pain-text">{card.pain}</p>
              </div>
            </div>
            <div className="pde-studies-detail__image-wrap">
              <img src={card.image} alt="" className="pde-studies-detail__image" />
            </div>
            <div className="pde-studies-detail__expand">
              <div className="pde-studies-detail__expand-block">
                <p className="pde-studies-detail__expand-title">{t('fde.studiesDetail.aiServiceTitle')}</p>
                <p className="pde-studies-detail__expand-text">
                  {parseHighlight(card.aiService)}
                </p>
              </div>
              <div className="pde-studies-detail__expand-block_2">
                <p className="pde-studies-detail__expand-title">{t('fde.studiesDetail.coreValueTitle')}</p>
                <p className="pde-studies-detail__expand-text">
                  {parseHighlight(card.coreValue)}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default PdeStudiesDetail;
