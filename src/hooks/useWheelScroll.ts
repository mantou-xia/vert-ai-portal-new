import { useState, useRef, useEffect } from 'react';

export type UseWheelScrollOptions = {
  /** 累积滚动量超过此值才切换，越大切换越慢，默认 120 */
  scrollThreshold?: number;
  /**
   * Dify 式锁区模式：进入区域后固定，必须切换完所有条目才能继续往下滚动。
   * 为 true 时：区域进入视口后锁定，滑轮仅切换条目；到达最后一条且向下滚时解锁。
   */
  lockMode?: boolean;
  /**
   * 锁区模式下的 IntersectionObserver threshold，0~1。
   * 越大则需更多区域进入视口才锁定，可避免过早拦截上一区块的滚动（如 HomeVideo 下滑放大）。
   * 默认 0.8。
   */
  lockThreshold?: number;
};

/**
 * 滑轮滚动 Hook：在区域内滚动时接管滚动，切换条目。
 * 普通模式：到达首/尾时放开，允许主页面滚动。
 * 锁区模式：进入区域后固定，必须切换完才能继续往下。
 */
export const useWheelScroll = (
  itemCount: number,
  options: UseWheelScrollOptions = {}
) => {
  const { scrollThreshold = 120, lockMode = false, lockThreshold = 0.8 } = options;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLocked, setIsLocked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const accumulatedRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);
  activeIndexRef.current = activeIndex;

  // 锁区模式：IntersectionObserver 检测区域是否进入视口
  useEffect(() => {
    if (!lockMode) return;
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsLocked(entry.isIntersecting);
      },
      { threshold: lockThreshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lockMode, lockThreshold]);

  useEffect(() => {
    if (itemCount <= 0) return;

    const handleWheel = (e: WheelEvent) => {
      const atFirst = activeIndexRef.current === 0;
      const atLast = activeIndexRef.current === itemCount - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      if (lockMode) {
        // 锁区模式：到达最后一条且向下滚时放开，允许主页面继续往下
        if (atLast && scrollingDown) {
          accumulatedRef.current = 0;
          return;
        }
        // 首条向上滚：放开，允许主页面往上
        if (atFirst && scrollingUp) {
          accumulatedRef.current = 0;
          return;
        }
      } else {
        // 普通模式：到达边界时放开
        if ((atFirst && scrollingUp) || (atLast && scrollingDown)) {
          accumulatedRef.current = 0;
          return;
        }
      }

      // 锁区模式需在 document 上监听（区域进入视口时接管全局滚动）
      if (lockMode) {
        e.preventDefault();
      }

      // 方向改变时重置累积
      if (
        (e.deltaY > 0 && accumulatedRef.current < 0) ||
        (e.deltaY < 0 && accumulatedRef.current > 0)
      ) {
        accumulatedRef.current = 0;
      }
      accumulatedRef.current += e.deltaY;

      if (Math.abs(accumulatedRef.current) >= scrollThreshold) {
        const steps = Math.floor(
          Math.abs(accumulatedRef.current) / scrollThreshold
        );
        const direction = accumulatedRef.current > 0 ? 1 : -1;
        accumulatedRef.current = accumulatedRef.current % scrollThreshold;

        setActiveIndex((prev) => {
          const next = Math.max(
            0,
            Math.min(prev + direction * steps, itemCount - 1)
          );
          return next;
        });
      }
    };

    if (lockMode) {
      if (!isLocked) return;
      const opts = { passive: false, capture: true };
      document.addEventListener('wheel', handleWheel, opts);
      return () => document.removeEventListener('wheel', handleWheel, opts);
    }

    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [itemCount, scrollThreshold, lockMode, isLocked]);

  return { sectionRef, activeIndex, setActiveIndex, isLocked };
};
