# Performance Study - Umi 项目

这是一个基于 Umi 4 构建的前端项目，用于性能研究和学习。

## 技术栈

- **Umi 4** - 企业级前端应用框架
- **React 18** - UI 库
- **Ant Design 5** - 企业级 UI 设计语言
- **TypeScript** - 类型安全的 JavaScript

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

项目将在 `http://localhost:8000` 启动

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 项目结构

```
performance_study/
├── src/
│   ├── pages/          # 页面目录
│   │   ├── Home/       # 首页
│   │   └── About/       # 关于页
│   └── app.tsx         # 全局配置文件
├── .umirc.ts          # Umi 配置文件
├── package.json        # 项目依赖配置
└── tsconfig.json       # TypeScript 配置
```

## 功能特性

- ✅ 路由配置
- ✅ 布局系统
- ✅ Ant Design 组件集成
- ✅ TypeScript 支持
- ✅ 开发热更新

## 开发指南

### 添加新页面

1. 在 `src/pages` 目录下创建新的页面文件夹
2. 在 `.umirc.ts` 的 `routes` 配置中添加路由

### 修改布局

编辑 `src/app.tsx` 文件来自定义布局配置。

## 更多信息

- [Umi 官方文档](https://umijs.org/)
- [Ant Design 文档](https://ant.design/)
- [React 文档](https://react.dev/)
