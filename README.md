<div align="center">

# HaloLight Admin (Deno)

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/deno-2.0+-black.svg" alt="Deno">
  <img src="https://img.shields.io/badge/fresh-1.7.3-yellow.svg" alt="Fresh">
  <img src="https://github.com/halolight/halolight-deno/actions/workflows/ci.yml/badge.svg" alt="CI">
  <img src="https://github.com/halolight/halolight-deno/actions/workflows/deploy.yml/badge.svg" alt="Deploy">
</p>

<p align="center">
  <strong>基于 Fresh (Deno) + Preact + TailwindCSS + Zustand 构建的现代化企业级管理系统模板</strong>
</p>

<p align="center">
  <a href="https://halolight-deno.deno.dev">在线演示</a> |
  <a href="#快速开始">快速开始</a> |
  <a href="#功能特性">功能特性</a> |
  <a href="#项目结构">项目结构</a>
</p>

</div>

---

## 项目概述

HaloLight Admin (Deno) 是 HaloLight 多框架管理系统的 Deno/Fresh
实现版本。它提供了完整的企业级后台管理系统功能，包括用户管理、权限控制、数据可视化、通知系统等。

### 技术栈

| 技术                                                          | 版本    | 说明                               |
| ------------------------------------------------------------- | ------- | ---------------------------------- |
| **[Fresh](https://fresh.deno.dev/)**                          | 1.7.3   | Deno 的现代 Web 框架，Islands 架构 |
| **[Preact](https://preactjs.com/)**                           | 10.22.0 | 轻量级 React 替代方案              |
| **[TailwindCSS](https://tailwindcss.com/)**                   | 3.4.1   | 原子化 CSS 框架                    |
| **[Sass](https://sass-lang.com/)**                            | 1.69.5  | CSS 预处理器                       |
| **[Zustand](https://zustand-demo.pmnd.rs/)**                  | 4.4.7   | 轻量级状态管理                     |
| **[TypeScript](https://www.typescriptlang.org/)**             | Latest  | 类型安全                           |
| **[Preact Signals](https://preactjs.com/guide/v10/signals/)** | 1.2.2   | 响应式状态管理                     |
| **[DJWT](https://deno.land/x/djwt)**                          | 3.0.2   | JWT 认证库                         |

## 功能特性

### 核心功能

- **认证系统** - 完整的登录、注册、忘记密码、重置密码流程
- **仪表盘** - 数据统计、图表展示、活动监控
- **用户管理** - CRUD 操作、状态管理、批量操作
- **文档管理** - 文档列表、搜索、分类
- **通知系统** - 实时通知、未读计数、标记已读
- **日历功能** - 事件管理、日期范围查询

### 技术特性

- **Islands 架构** - 最优的客户端交互性能
- **服务端渲染 (SSR)** - 首屏加载优化
- **主题系统** - 亮色/暗色/系统主题切换
- **响应式设计** - 完美适配多端设备
- **TypeScript** - 完整类型支持
- **Mock API** - 内置 Mock 数据层，开箱即用

## 快速开始

### 前置要求

- [Deno](https://deno.land/) 2.0+

### 安装和运行

```bash
# 克隆项目
git clone https://github.com/halolight/halolight-deno.git
cd halolight-deno

# 配置环境变量
cp .env.example .env

# 启动开发服务器
deno task start
```

项目将在 http://localhost:8000 启动

### 可用命令

| 命令                      | 说明                                   |
| ------------------------- | -------------------------------------- |
| `deno task start`         | 启动开发服务器（支持热重载）           |
| `deno task build`         | 构建生产版本                           |
| `deno task preview`       | 预览生产构建                           |
| `deno task check`         | 代码质量检查（格式化、Lint、类型检查） |
| `deno task fmt`           | 代码格式化                             |
| `deno task lint`          | 代码 Lint 检查                         |
| `deno task test`          | 运行测试                               |
| `deno task test:coverage` | 运行测试并生成覆盖率报告               |

## 项目结构

```
halolight-deno/
├── components/           # 可复用组件
│   ├── ui/              # 基础 UI 组件 (Button, Card, Input, Modal...)
│   ├── layout/          # 布局组件 (Header, Sidebar, Layout)
│   └── auth/            # 认证相关组件
├── islands/             # Fresh Islands (客户端交互组件)
│   ├── Dashboard.tsx    # 仪表盘
│   ├── LoginForm.tsx    # 登录表单
│   ├── RegisterForm.tsx # 注册表单
│   └── ...
├── routes/              # 路由页面和 API
│   ├── api/             # API 路由
│   │   ├── auth/        # 认证 API
│   │   ├── dashboard/   # 仪表盘 API
│   │   ├── users/       # 用户 API
│   │   ├── documents/   # 文档 API
│   │   ├── notifications/ # 通知 API
│   │   └── calendar/    # 日历 API
│   └── status/          # 错误状态页面
├── hooks/               # 自定义 Hooks
│   ├── useUsers.ts      # 用户管理 Hooks
│   ├── useDocuments.ts  # 文档管理 Hooks
│   ├── useDashboardData.ts # 仪表盘数据 Hooks
│   ├── useNotifications.ts # 通知 Hooks
│   └── useCalendar.ts   # 日历 Hooks
├── stores/              # Zustand 状态管理
│   ├── useAuthStore.ts  # 认证状态
│   ├── useThemeStore.ts # 主题状态
│   ├── useDashboardStore.ts # 仪表盘状态
│   ├── useTabsStore.ts  # 多标签页状态
│   └── ...
├── providers/           # 上下文 Providers
│   ├── ThemeProvider.tsx
│   ├── AuthProvider.tsx
│   └── AppProviders.tsx
├── lib/                 # 核心库
│   ├── api/             # API 服务层
│   ├── auth/            # 认证逻辑
│   └── mock/            # Mock 数据
├── styles/              # Sass 样式
├── static/              # 静态资源
├── types/               # TypeScript 类型定义
└── utils/               # 工具函数
```

## API 路由

| 路由                               | 方法           | 说明                  |
| ---------------------------------- | -------------- | --------------------- |
| `/api/auth/login`                  | POST           | 用户登录              |
| `/api/auth/register`               | POST           | 用户注册              |
| `/api/auth/logout`                 | POST           | 用户登出              |
| `/api/auth/me`                     | GET            | 获取当前用户          |
| `/api/dashboard/stats`             | GET            | 仪表盘统计数据        |
| `/api/dashboard/visits`            | GET            | 访问趋势数据          |
| `/api/dashboard/activities`        | GET            | 最近活动              |
| `/api/users`                       | GET/POST       | 用户列表/创建用户     |
| `/api/users/[id]`                  | GET/PUT/DELETE | 单个用户操作          |
| `/api/documents`                   | GET/POST       | 文档列表/创建文档     |
| `/api/documents/[id]`              | GET/PUT/DELETE | 单个文档操作          |
| `/api/notifications`               | GET/POST       | 通知列表/创建通知     |
| `/api/notifications/unread-count`  | GET            | 未读通知数量          |
| `/api/notifications/mark-all-read` | POST           | 标记全部已读          |
| `/api/calendar/events`             | GET/POST       | 日历事件列表/创建事件 |
| `/api/calendar/events/[id]`        | GET/PUT/DELETE | 单个事件操作          |

## 环境变量

```env
# GitHub OAuth 配置
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# 应用配置
APP_BASE_URL=http://localhost:8000

# JWT 配置
JWT_SECRET=your_super_secret_jwt_key
SESSION_EXPIRE_TIME=86400
```

## 部署

### Deno Deploy

项目已配置 Deno Deploy 自动部署：

1. Fork 此仓库
2. 在 Deno Deploy 创建项目
3. 连接 GitHub 仓库
4. 配置环境变量
5. 推送代码即可自动部署

### 手动部署

```bash
# 构建项目
deno task build

# 预览生产构建
deno task preview
```

## 相关项目

HaloLight 是一个多框架企业级管理系统，包含以下实现：

- [halolight](https://github.com/halolight/halolight) - Next.js 14 实现
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 3.5 实现
- [halolight-angular](https://github.com/halolight/halolight-angular) - Angular
  21 实现
- **halolight-deno** - Deno/Fresh 实现 (当前项目)
- [docs](https://github.com/halolight/docs) - 文档与规范

## 贡献指南

欢迎贡献代码！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<div align="center">

**HaloLight Admin (Deno)** - 现代化企业级管理系统

</div>
