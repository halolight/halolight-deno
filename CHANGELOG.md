# 更新日志

本文件记录了 HaloLight Admin (Deno) 项目的所有重要更改。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 计划中

- 更多 OAuth 提供商支持（Google、Microsoft、Gitee）
- 高级权限管理系统
- 数据导出功能
- 更多图表类型

## [1.0.0] - 2025-12-01

### 新增

- **认证系统**
  - 完整的登录/注册/忘记密码/重置密码流程
  - GitHub OAuth 集成
  - JWT 会话管理
  - 密码强度验证

- **仪表盘**
  - 数据统计卡片（用户、收入、订单、转化率）
  - 访问趋势图表
  - 最近活动列表
  - 快捷操作入口

- **用户管理**
  - 用户列表（分页、搜索、筛选）
  - 用户 CRUD 操作
  - 批量删除功能
  - 状态管理（启用/禁用）

- **文档管理**
  - 文档列表展示
  - 文档搜索和分类
  - 文档 CRUD 操作

- **通知系统**
  - 通知列表
  - 未读计数
  - 标记已读/全部已读
  - 通知详情

- **日历功能**
  - 日历事件列表
  - 事件 CRUD 操作
  - 日期范围查询

- **UI 组件库**
  - Button（多种变体：primary、secondary、outline、ghost、gradient、glass）
  - Card（标题、内容、页脚子组件）
  - Input（支持浮动标签）
  - Modal（模态框）
  - Skeleton（骨架屏加载）
  - Separator（分割线）
  - Checkbox（复选框和复选框组）
  - Avatar（头像）
  - Badge（徽章）
  - Alert（提示框）
  - Spinner（加载指示器）

- **自定义 Hooks**
  - useUsers - 用户管理
  - useDocuments - 文档管理
  - useDashboardData - 仪表盘数据
  - useNotifications - 通知管理
  - useCalendar - 日历事件
  - useLocalStorage - 本地存储
  - useDebounce - 防抖
  - useFetch - 数据获取
  - useMediaQuery - 媒体查询

- **状态管理（Zustand）**
  - useAuthStore - 认证状态（持久化）
  - useThemeStore - 主题状态（持久化）
  - useDashboardStore - 仪表盘状态
  - useTabsStore - 多标签页状态
  - useNavigationStore - 导航状态
  - useUiSettingsStore - UI 设置状态
  - useErrorStore - 错误日志状态

- **Provider 系统**
  - ThemeProvider - 主题切换
  - AuthProvider - 认证状态
  - ErrorProvider - 错误捕获
  - MockProvider - Mock 数据初始化
  - AppProviders - 组合 Provider

- **Mock API**
  - 完整的 RESTful API 路由
  - 中文随机数据生成
  - 分页和筛选支持

- **开发工具**
  - TypeScript 完整支持
  - TailwindCSS + Sass 双重样式方案
  - CI/CD 工作流（GitHub Actions）
  - 代码质量检查（fmt、lint、type-check）

### 技术栈

- **运行时**: Deno 2.0+
- **框架**: Fresh 1.7.3
- **UI 库**: Preact 10.22.0
- **样式**: TailwindCSS 3.4.1 + Sass 1.69.5
- **状态管理**: Zustand 4.4.7
- **类型系统**: TypeScript
- **认证**: DJWT 3.0.2

### 项目结构

```
halolight-deno/
├── components/     # 可复用组件
├── islands/        # Fresh Islands (客户端组件)
├── routes/         # 路由页面和 API
├── hooks/          # 自定义 Hooks
├── stores/         # Zustand 状态管理
├── providers/      # 上下文 Providers
├── lib/            # 核心库（API、Mock）
├── styles/         # Sass 样式文件
├── static/         # 静态资源
├── types/          # TypeScript 类型定义
└── utils/          # 工具函数
```

---

## 版本说明

- **[未发布]** - 即将发布的更改
- **[1.0.0]** - 首个正式版本

## 贡献

如果您想为此项目做出贡献，请查看我们的 [贡献指南](CONTRIBUTING.md)。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
