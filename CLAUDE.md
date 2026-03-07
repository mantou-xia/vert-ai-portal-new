# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

VERT.AI 门户网站，基于 React + TypeScript + Vite 技术栈开发，支持深色模式、国际化（中文/英文）、响应式设计。

## 开发命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run lint         # 运行ESLint检查
npm run preview      # 预览生产构建
npm run deploy       # 部署到GitHub Pages
```

## 项目架构

```
vert-ai-portal/
├── src/
│   ├── main.tsx              # 应用入口，配置路由、主题、国际化
│   ├── App.tsx               # 根组件，包含路由配置和整体布局
│   ├── config/               # 配置文件
│   │   ├── theme.ts          # 主题配置（浅色/深色）
│   │   └── routes.ts         # 路由配置
│   ├── components/           # 组件目录
│   │   ├── Layout/           # 布局组件
│   │   ├── Home/             # 首页模块组件
│   │   └── common/           # 通用组件
│   ├── hooks/                # 自定义Hooks
│   │   ├── useTheme.ts       # 主题切换Hook
│   │   └── useScrollAnimation.ts  # 滚动动画Hook
│   ├── i18n/                 # 国际化配置
│   │   ├── index.ts          # i18n初始化
│   │   └── locales/          # 语言文件（zh-CN、en-US）
│   ├── pages/                # 页面组件
│   │   ├── HomePage.tsx      # 首页
│   │   ├── ProductsPage.tsx  # 产品页
│   │   ├── SolutionsPage.tsx # 解决方案页
│   │   ├── CasesPage.tsx     # 案例页
│   │   ├── ResourcesPage.tsx # 资源页
│   │   └── AboutPage.tsx     # 关于页
│   └── utils/                # 工具函数
│       ├── api.ts            # API客户端配置
│       └── mock.ts           # Mock数据
├── public/                   # 静态资源
│   └── images/               # 图片资源
├── vite.config.ts            # Vite配置
├── tsconfig.json             # TypeScript配置
└── package.json              # 项目依赖
```

## 核心模块说明

### 路由系统
- 使用 React Router v7
- 路由配置在 `src/config/routes.ts`
- 支持的页面：首页、产品、解决方案、案例、资源、关于、FDE

### 主题系统
- Ant Design ConfigProvider 提供主题
- 支持浅色/深色模式切换
- 主题配置在 `src/config/theme.ts`
- `useTheme` Hook 管理主题状态（localStorage持久化）

### 国际化
- 使用 react-i18next
- 语言文件：`src/i18n/locales/zh-CN.ts`、`src/i18n/locales/en-US.ts`
- 通过 `useTranslation()` Hook 使用：`t('key')`

### API集成
- Axios 客户端配置在 `src/utils/api.ts`
- 当前使用 Mock 数据（`src/utils/mock.ts`）
- 真实API接口已预留注释，后端准备好后取消注释即可

## 关键技术说明

### TypeScript配置
- 严格模式已启用
- JSX使用 `react-jsx` 转换
- 未使用的变量/参数检查已启用

### 样式方案
- CSS Modules 模式：每个组件对应一个 `.css` 文件
- Ant Design 主题 Token 通过 `theme.useToken()` Hook 获取
- 全局样式在 `src/index.css`

### 使用框架
- antd

### 部署
- GitHub Pages 部署
- 生产环境基础路径：`/vert-ai-portal/`
- 构建输出目录：`dist/`


### 前端样式
css 使用父子格式，例如 
.a{
color: red;
 .b{}  
.c{}
}
后面改到css文件， 顺带把已存在的直接修复为父子结构