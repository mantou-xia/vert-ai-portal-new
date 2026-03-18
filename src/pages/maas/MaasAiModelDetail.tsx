import React, { useEffect, useRef, useState } from 'react';
import { getAssetPath } from '../../utils/path';
import './MaasAiModelDetail.css';

type RouterCard = {
  key: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const ROUTER_CARDS: RouterCard[] = [
  {
    key: 'api',
    title: '一站式API，适配所有大模型',
    description:
      '基于 VERT 的核心平台（VERT.Insight、VERT.Flow、VERT.Core），为客户开发定制化的 AI Agent、工作流和数据治理模块，解决行业特有的业务痛点。',
    image: '/images/maas/image_mass_1.png',
    imageAlt: '一站式 API 与多模型适配',
  },
  {
    key: 'cost',
    title: '成本与性能平衡',
    description:
      '灵活适配各类 AI Agent，快速落地业务场景，兼顾项目质量与成本控制。VERT.MAAS 本地部署，加速企业级智能体落地，依托可插拔 MCP 模型组件平台，自定义工具与工作流。',
    image: '/images/maas/image_mass_2.png',
    imageAlt: '成本与性能平衡能力图',
  },
  {
    key: 'availability',
    title: '更高可用性',
    description:
      '基于 VERT.Core 云原生平台及腾讯云战略合作支持，保障 AI 模型稳定运行。提供卓越性能，相比任何单智能体系统，能以更低成本更快地处理复杂、长期的任务。',
    image: '/images/maas/image_mass_3.png',
    imageAlt: '高可用与稳定性图示',
  },
  {
    key: 'local',
    title: '本地、私有安全',
    description:
      '你的数据永远属于你。专注于本地、私有部署，你的工作流和敏感信息不会脱离掌控。开源以实现完全透明与信任。',
    image: '/images/maas/image_mass_4.png',
    imageAlt: '本地私有安全示意图',
  },
  {
    key: 'landing',
    title: '从模型到产品，全流程落地',
    description:
      '智能体市场精选优质智能体，精准匹配各行业业务需求；一键便捷接入，API 直接对接生产环境，顺畅嵌入业务全流程，无需额外适配。',
    image: '/images/maas/image_mass_5.png',
    imageAlt: '模型到产品全流程落地图',
  },
  {
    key: 'web-search',
    title: '联网搜索（Web Search）',
    description:
      '三大核心形态：涵盖联网检索、问答增强、搜索智能体，适配多场景需求；多引擎聚合赋能，整合自研与第三方引擎，实现网页内容一键快速检索。',
    image: '/images/maas/image_mass_6.png',
    imageAlt: '联网搜索能力图示',
  },
  {
    key: 'mcp',
    title: 'MCP',
    description:
      '通用适配接口支持工具一键直连，实现模型与工具的无缝衔接；完善生态服务，集成精选 MCP 工具，助力模型高效破解复杂业务场景难题。',
    image: '/images/maas/image_mass_7.png',
    imageAlt: 'MCP 工具连接图',
  },
  {
    key: 'rag',
    title: '知识库（RAG）',
    description:
      '全链路快速构建：从内容解析、切片、索引到检索，高效打通无阻碍；专业级增强检索依托上下文增强技术，实现高精度内容召回，提升检索质量。',
    image: '/images/maas/image_mass_7.png',
    imageAlt: '知识库 RAG 工作流图',
  },
  {
    key: 'fine-tuning',
    title: '模型微调（Fine-tuning）',
    description:
      '精准业务对齐：基于专属业务数据，精准匹配业务风格及定制化规则；灵活高效适配，可按需选择 LoRA 或全参微调模式，投入产出比清晰可控。',
    image: '/images/maas/image_mass_7.png',
    imageAlt: '模型微调能力图示',
  },
];

const MaasAiModelDetail: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchStartScrollRef = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    setIsDragging(true);
    dragStartXRef.current = event.pageX;
    dragStartScrollRef.current = viewport.scrollLeft;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !viewportRef.current) {
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
    if (!viewport || event.touches.length === 0) {
      return;
    }

    touchStartXRef.current = event.touches[0].clientX;
    touchStartScrollRef.current = viewport.scrollLeft;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || event.touches.length === 0) {
      return;
    }

    const delta = event.touches[0].clientX - touchStartXRef.current;
    viewport.scrollLeft = touchStartScrollRef.current - delta;
  };

  return (
    <section
      ref={sectionRef}
      className={`maas-ai-model-detail ${isVisible ? 'maas-ai-model-detail--visible' : ''}`}
      aria-label="VERT ROUNTER Interface for AI 工具及LLM列表"
    >
      <div className="maas-ai-model-detail__inner">
        <header className="maas-ai-model-detail__header">
          <h2 className="maas-ai-model-detail__title">VERT ROUNTER Interface for AI 工具及LLM列表</h2>
        </header>

        <div
          ref={viewportRef}
          className={`maas-ai-model-detail__viewport ${isDragging ? 'maas-ai-model-detail__viewport--dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="maas-ai-model-detail__list" role="list">
            {ROUTER_CARDS.map((card, index) => (
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
