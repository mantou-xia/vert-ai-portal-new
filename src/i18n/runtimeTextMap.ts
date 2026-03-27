export const ZH_TO_EN_RUNTIME_TEXT_MAP: Record<string, string> = {
  '首页': 'Home',
  '产品': 'Products',
  '关于我们': 'About Us',
  '联系我们': 'Contact Us',
  '立即开始': 'Get Started',
  '立即试用': 'Try Now',
  '成为合作伙伴': 'Become a Partner',
  '微信咨询': 'WeChat Consultation',
  '电话咨询': 'Phone Consultation',
  'Demo体验': 'Demo',
  '返回顶部': 'Back to Top',
  '关闭': 'Close',
  '微信二维码': 'WeChat QR Code',
  '姓名': 'Name',
  '姓名/称呼': 'Name',
  '公司名称': 'Company Name',
  '联系电话': 'Phone',
  '提交': 'Submit',
  '提交中…': 'Submitting…',
  '海量插件，即插即用': 'Massive plugins, plug and play',
  '覆盖办公、AI能力、数据处理等多场景，无需开发即可集成':
    'Covering office, AI capabilities, and data processing scenarios with no extra development',
  '插件关系图': 'Plugin relationship diagram',
  '插件中心': 'Plugin Center',
  '插件总数': 'Total Plugins',
  '使用次数': 'Usage Count',
  '开发者': 'Developers',
  '企业用户': 'Enterprise Users',
  'PDF处理': 'PDF Processing',
  'JSON处理': 'JSON Processing',
  'OCR识别服务': 'OCR Recognition Service',
  '企业微信 Bot': 'Enterprise WeChat Bot',
  '通义千问': 'Qwen',
  '企微': 'WeCom',
  '钉钉': 'DingTalk',
  '飞书': 'Feishu',
  '质谱': 'Zhipu',
  '统一管理': 'Unified Management',
  '快速构建': 'Rapid Development',
  '知识驱动': 'Knowledge-Driven',
  '工具生态': 'Tool Ecosystem',
  '流程编排': 'Workflow Orchestration',
  '多模型统一接入 / 监控 / 调度，支持国内外厂商+本地模型，一站式管控模型生命周期':
    'Unified access, monitoring, and scheduling across global and local models for full lifecycle control',
  '低代码可视化设计 Agent / 工作流，节点级调试，一键发布部署':
    'Low-code visual design for agents and workflows with node-level debugging and one-click deployment',
  '全流程RAG能力，多格式文档解析 + 智能检索 + 幻觉抑制，为 AI 提供精准知识支撑':
    'End-to-end RAG with document parsing, smart retrieval, and hallucination suppression for precise AI knowledge support',
  '海量内置工具组件，支持自定义开发 + 第三方集成，无限扩展 AI 能力边界':
    'Massive built-in tools with custom development and third-party integration to extend AI capability boundaries',
  '多模式工作流设计，支持复杂分支 / 并行 / 断点重试，适配企业复杂业务逻辑':
    'Multi-mode workflow design with complex branching, parallelism, and retry checkpoints for enterprise logic',
  'VERT 大模型中台 - 企业级一体化智能服务平台':
    'VERT Model Hub - Enterprise Integrated Intelligent Service Platform',
  'VERT 大模型中台\u00A0\u00A0-\u00A0\u00A0企业级一体化智能服务平台':
    'VERT Model Hub - Enterprise Integrated Intelligent Service Platform',
  '一站式实现大模型统一管理、智能 Agent 构建、知识库 & RAG 引擎、可视化工作流编排与工具生态集成，低代码降低企业 AI 开发门槛，高可扩展赋能全场景 AI 落地执行':
    'Unified model management, intelligent agent building, knowledge base & RAG, visual workflow orchestration, and ecosystem integration with low-code efficiency and high scalability',
  '五大核心价值，重构企业 AI 开发效率':
    'Five Core Values to Reshape Enterprise AI Development Efficiency',
};

export const EN_TO_ZH_RUNTIME_TEXT_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(ZH_TO_EN_RUNTIME_TEXT_MAP).map(([zh, en]) => [en, zh])
);
