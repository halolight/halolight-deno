# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在本仓库中工作时提供指导。

## 项目概述

HaloLight Fresh (Deno) 版本是 HaloLight 管理后台模板的 Fresh 框架实现，基于
Fresh 1.7.3 + Deno + Preact 构建，采用 Islands
架构实现零配置、极速启动的现代化全栈开发模板。

**在线预览**: https://halolight-deno.deno.dev

**GitHub**: https://github.com/halolight/halolight-deno

### 仓库关系

本项目属于 HaloLight 多框架生态的一部分:

- `halolight/docs`: 文档与规范唯一来源
  (VitePress)，定义跨框架设计、API、最佳实践
- `halolight/halolight`: Next.js 14 参考实现
- `halolight/halolight-vue`: Vue 3.5 参考实现
- `halolight/halolight-deno`: **本项目** - Fresh (Deno) 实现

**贡献流程**:

1. 先在 `halolight/docs` 更新规范
2. 同步到参考实现 (Next.js / Vue)
3. 推广到本项目及其他框架实现，保持行为一致

## 技术栈

| 技术                  | 版本    | 说明                              |
| --------------------- | ------- | --------------------------------- |
| Fresh                 | 1.7.3   | Deno 全栈 Web 框架，Islands 架构  |
| Deno                  | 2.x     | 现代 JavaScript/TypeScript 运行时 |
| Preact                | 10.22.0 | 轻量级 React 替代方案             |
| @preact/signals       | 1.2.2   | 响应式状态管理                    |
| TypeScript            | 内置    | 完整类型安全，Preact JSX 运行时   |
| TailwindCSS           | 3.4.1   | 原子化 CSS 框架                   |
| Sass                  | 1.69.5  | CSS 预处理器                      |
| Zustand               | 4.4.7   | 轻量级状态管理                    |
| DJWT                  | 3.0.2   | JWT 认证库                        |
| Deno Standard Library | 0.216.0 | Deno 标准库                       |

## 开发命令

```bash
# 启动开发服务器 (支持热重载)
deno task start

# 构建生产版本
deno task build

# 预览生产构建
deno task preview

# 代码质量检查 (格式化 + Lint + 类型检查)
deno task check

# 更新 Fresh 框架
deno task update

# 生成清单文件
deno task manifest
```

## 目录结构

```
halolight-deno/
├── routes/                      # 基于文件的路由系统
│   ├── _app.tsx                # 根应用组件
│   ├── _404.tsx                # 404 错误页面
│   ├── index.tsx               # 首页
│   ├── about.tsx               # 关于页面
│   ├── admin.tsx               # 管理页面
│   ├── dashboard.tsx           # 仪表盘页面
│   ├── login.tsx               # 登录页面
│   ├── register.tsx            # 注册页面
│   ├── forgot-password.tsx     # 忘记密码页面
│   ├── reset-password.tsx      # 重置密码页面
│   ├── components.tsx          # 组件演示
│   ├── hooks.tsx               # Hooks 演示
│   ├── state.tsx               # 状态管理演示
│   ├── profile.tsx             # 个人中心
│   ├── greet/[name].tsx        # 动态路由示例
│   ├── api/                    # API 路由
│   │   ├── auth/               # 认证端点
│   │   │   ├── github.ts       # GitHub OAuth 入口
│   │   │   ├── callback.ts     # OAuth 回调处理
│   │   │   ├── me.ts           # 获取当前用户
│   │   │   └── logout.ts       # 登出
│   │   ├── dashboard/          # 仪表盘数据
│   │   │   ├── stats.ts        # 统计数据
│   │   │   ├── visits.ts       # 访问趋势
│   │   │   └── activities.ts   # 活动数据
│   │   ├── users/              # 用户管理
│   │   │   ├── index.ts        # 列表/创建
│   │   │   └── [id].ts         # 详情/更新/删除
│   │   ├── documents/          # 文档管理
│   │   │   ├── index.ts        # 列表/创建
│   │   │   └── [id].ts         # 详情/更新/删除
│   │   ├── notifications/      # 通知管理
│   │   │   ├── index.ts        # 列表/创建
│   │   │   ├── [id].ts         # 详情/更新/删除
│   │   │   ├── unread-count.ts # 未读数量
│   │   │   └── mark-all-read.ts # 标记全部已读
│   │   ├── calendar/           # 日历事件
│   │   │   ├── events.ts       # 事件列表/创建
│   │   │   └── events/[id].ts  # 事件详情/更新/删除
│   │   └── joke.ts             # 示例 API
│   └── status/                 # 错误状态页面
│       ├── 401.tsx             # 未授权
│       ├── 403.tsx             # 禁止访问
│       ├── 500.tsx             # 服务器错误
│       ├── 502.tsx             # 网关错误
│       └── 503.tsx             # 服务不可用
├── islands/                    # 客户端交互组件 (Islands 架构)
│   ├── AuthMenu.tsx            # 认证菜单
│   ├── Counter.tsx             # 计数器
│   ├── CounterDemo.tsx         # 计数器演示
│   ├── ComponentsDemo.tsx      # 组件演示
│   ├── Dashboard.tsx           # 仪表盘组件
│   ├── LoginForm.tsx           # 登录表单
│   ├── RegisterForm.tsx        # 注册表单
│   ├── ForgotPasswordForm.tsx  # 忘记密码表单
│   ├── ResetPasswordForm.tsx   # 重置密码表单
│   ├── HeaderNavigation.tsx    # 头部导航
│   ├── HooksDemo.tsx           # Hooks 演示
│   ├── LayoutManager.tsx       # 布局管理
│   ├── NavigationState.tsx     # 导航状态
│   ├── SidebarNavigation.tsx   # 侧边栏导航
│   ├── SimpleStateDemo.tsx     # 简单状态演示
│   ├── StateDemo.tsx           # 状态演示
│   ├── StatusDropdown.tsx      # 状态下拉
│   └── ThemeToggle.tsx         # 主题切换
├── components/                 # 服务端渲染组件
│   ├── ui/                     # 基础 UI 组件 (20+)
│   │   ├── Button.tsx          # 按钮组件
│   │   ├── Card.tsx            # 卡片组件
│   │   ├── Input.tsx           # 输入框组件
│   │   ├── Modal.tsx           # 模态框组件
│   │   ├── Checkbox.tsx        # 复选框组件
│   │   ├── Select.tsx          # 下拉选择组件
│   │   ├── Badge.tsx           # 徽章组件
│   │   ├── Avatar.tsx          # 头像组件
│   │   ├── Skeleton.tsx        # 骨架屏组件
│   │   ├── Progress.tsx        # 进度条组件
│   │   ├── Switch.tsx          # 开关组件
│   │   ├── Tabs.tsx            # 标签页组件
│   │   ├── Toast.tsx           # 消息提示组件
│   │   ├── Tooltip.tsx         # 工具提示组件
│   │   ├── Dropdown.tsx        # 下拉菜单组件
│   │   ├── Table.tsx           # 表格组件
│   │   ├── Pagination.tsx      # 分页组件
│   │   └── ...                 # 更多组件
│   ├── layout/                 # 布局组件
│   │   ├── Header.tsx          # 头部
│   │   ├── Layout.tsx          # 主布局
│   │   └── Sidebar.tsx         # 侧边栏
│   ├── auth/                   # 认证组件
│   │   ├── AuthGuard.tsx       # 认证守卫
│   │   ├── AuthShell.tsx       # 认证页面壳
│   │   ├── LoginButton.tsx     # 登录按钮
│   │   └── UserProfile.tsx     # 用户信息
│   └── dashboard/              # 仪表盘组件
│       ├── StatsCard.tsx       # 统计卡片
│       ├── RecentActivity.tsx  # 最近活动
│       └── index.ts            # 入口
├── stores/                     # Zustand 状态管理
│   ├── useAuthStore.ts         # 认证状态 (带持久化)
│   ├── useThemeStore.ts        # 主题状态
│   ├── useAppStore.ts          # 全局应用状态
│   ├── useUserStore.ts         # 用户状态
│   ├── useDashboardStore.ts    # 仪表盘状态
│   ├── useErrorStore.ts        # 错误日志状态
│   ├── useTabsStore.ts         # 标签页状态
│   ├── useNavigationStore.ts   # 导航状态
│   ├── useUiSettingsStore.ts   # UI 设置状态
│   └── index.ts                # 统一导出
├── hooks/                      # 自定义 Hooks
│   ├── useCounter.ts           # 计数器
│   ├── useDebounce.ts          # 防抖
│   ├── useFetch.ts             # 数据获取
│   ├── useLocalStorage.ts      # 本地存储
│   ├── useMediaQuery.ts        # 媒体查询
│   ├── useTheme.ts             # 主题
│   ├── useToggle.ts            # 开关
│   ├── useUsers.ts             # 用户数据
│   ├── useDocuments.ts         # 文档数据
│   ├── useDashboardData.ts     # 仪表盘数据
│   ├── useNotifications.ts     # 通知数据
│   ├── useCalendar.ts          # 日历数据
│   └── index.ts                # 统一导出
├── providers/                  # Provider 组件
│   ├── ThemeProvider.tsx       # 主题 Provider
│   ├── AuthProvider.tsx        # 认证 Provider
│   ├── ErrorProvider.tsx       # 错误 Provider
│   ├── MockProvider.tsx        # Mock Provider
│   ├── AppProviders.tsx        # 组合 Provider
│   └── index.ts                # 统一导出
├── lib/                        # 库文件
│   ├── api/                    # API 服务层
│   │   ├── types.ts            # 类型定义
│   │   ├── services.ts         # 服务函数
│   │   └── index.ts            # 入口
│   ├── auth/                   # 认证工具
│   │   ├── password-rules.ts   # 密码规则
│   │   └── index.ts            # 入口
│   ├── mock/                   # Mock 数据
│   │   ├── data.ts             # 数据生成器
│   │   └── index.ts            # 入口
│   └── utils.ts                # 通用工具
├── config/                     # 配置文件
│   ├── routes.ts               # 路由配置
│   └── tdk.ts                  # TDK 配置
├── utils/                      # 工具函数
│   ├── auth.ts                 # GitHub OAuth 配置
│   ├── jwt.ts                  # JWT 令牌处理
│   ├── middleware.ts           # 请求/响应工具
│   └── clientOnly.tsx          # 客户端渲染工具
├── styles/                     # Sass 样式
│   ├── main.scss               # 样式入口
│   ├── variables/
│   │   └── _theme.scss         # 主题变量
│   ├── utilities/
│   │   └── _mixins.scss        # Mixins
│   ├── base/
│   │   └── _reset.scss         # 重置样式
│   └── components/
│       └── _custom.scss        # 组件样式
├── static/                     # 静态资源
│   ├── favicon.ico
│   ├── logo.svg
│   └── styles/                 # CSS 样式
├── docs/                       # 项目文档
├── deno.json                   # Deno 配置
├── fresh.config.ts             # Fresh 配置
├── fresh.gen.ts                # 自动生成清单
├── tailwind.config.ts          # TailwindCSS 配置
├── main.ts                     # 生产环境入口
└── dev.ts                      # 开发环境入口
```

## 核心架构

### Islands 架构

Fresh 采用 Islands 架构，默认所有组件在服务端渲染 (零 JS)，仅 `islands/`
目录下的组件在客户端进行水合:

- **服务端组件** (`components/`): 纯 SSR，无客户端 JS
- **Islands 组件** (`islands/`): 客户端交互，按需水合

```tsx
// islands/Counter.tsx - 客户端交互组件
import { useSignal } from "@preact/signals";

export default function Counter() {
  const count = useSignal(0);
  return (
    <button onClick={() => count.value++}>
      点击次数: {count.value}
    </button>
  );
}
```

### 状态管理

#### Zustand Store (推荐用于复杂状态)

```typescript
// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      login: async (credentials) => {
        // 登录逻辑
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      checkAuth: async () => {
        // 验证逻辑
      },
    }),
    { name: "auth-storage" },
  ),
);
```

#### Preact Signals (推荐用于简单响应式状态)

```typescript
import { computed, effect, signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const user = signal<User | null>(null);
export const token = signal<string | null>(null);
export const isAuthenticated = computed(() => !!token.value && !!user.value);

// 仅在浏览器端持久化
if (IS_BROWSER) {
  effect(() => {
    if (user.value && token.value) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: user.value,
          token: token.value,
        }),
      );
    }
  });
}
```

### 认证系统

项目使用 GitHub OAuth + JWT 会话:

**环境变量配置**:

```bash
# .env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_secure_random_string
APP_BASE_URL=http://localhost:8000
SESSION_EXPIRE_TIME=86400
```

**认证流程**:

1. `GET /api/auth/github` - 启动 GitHub OAuth
2. `GET /api/auth/callback` - 处理 OAuth 回调
3. `GET /api/auth/me` - 获取当前用户信息
4. `POST /api/auth/logout` - 清除会话

**权限检查**:

```typescript
// 权限格式: resource:action
const permissions = [
  "users:list", // 查看用户列表
  "users:create", // 创建用户
  "users:*", // 用户所有权限
  "*", // 超级管理员
];

function hasPermission(userPerms: string[], required: string): boolean {
  return userPerms.some((p) =>
    p === "*" ||
    p === required ||
    (p.endsWith(":*") && required.startsWith(p.slice(0, -1)))
  );
}
```

### 主题系统

支持三种主题模式: `light` (浅色)、`dark` (深色)、`system` (跟随系统)

```typescript
// stores/useThemeStore.ts
interface ThemeState {
  theme: "light" | "dark" | "system";
  setTheme: (theme: string) => void;
}

// 使用
const { theme, setTheme } = useThemeStore();
```

## 组件开发规范

### UI 组件 (`components/ui/`)

- 使用 TypeScript 接口定义 Props
- 支持 `variant` 和 `size` props
- 包含 `loading` 和 `disabled` 状态
- 结合 TailwindCSS 类和自定义 Sass 类

**Button 组件示例**:

```tsx
interface ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "gradient"
    | "glass";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children: ComponentChildren;
  onClick?: () => void;
}
```

### 样式系统

**双重方案**:

- **TailwindCSS**: 快速原型开发，原子化工具类
- **Sass**: 复杂样式逻辑、主题变量、组件特定样式

**全局工具类**:

- `.glass-effect` - 玻璃态效果
- `.text-gradient` - 渐变文字
- 自定义动画: `fade-in`、`slide-up`、`gradient-flow`

## 文件命名约定

| 类型     | 命名规则              | 示例                                  |
| -------- | --------------------- | ------------------------------------- |
| 组件     | PascalCase            | `Button.tsx`, `AuthGuard.tsx`         |
| Hooks    | camelCase，`use` 前缀 | `useCounter.ts`, `useDebounce.ts`     |
| Stores   | camelCase，`use` 前缀 | `useAuthStore.ts`, `useThemeStore.ts` |
| 工具     | camelCase             | `auth.ts`, `middleware.ts`            |
| 页面     | camelCase             | `index.tsx`, `profile.tsx`            |
| API 路由 | camelCase             | `github.ts`, `callback.ts`            |

## 共用约束

与 HaloLight 其他框架实现保持一致:

- **数据**: Mock.js + fetch 拦截，结构与参考实现一致
- **认证**: 登录/注册/忘记/重置流程，包含权限校验
- **环境变量**: 统一命名 (`*_API_URL`、`*_USE_MOCK`、`*_DEMO_*`、`*_BRAND_NAME`
  等)
- **CI/CD**: 统一工作流 (lint、type-check、test、build、security、coverage)

## 部署

### Deno Deploy (推荐)

```bash
# 安装 deployctl
deno install -A --no-check -r -f https://deno.land/x/deploy/deployctl.ts

# 部署
deployctl deploy --project=halolight-deno main.ts
```

### Docker

```dockerfile
FROM denoland/deno:2.0.0
WORKDIR /app
COPY . .
RUN deno cache main.ts
EXPOSE 8000
CMD ["run", "-A", "main.ts"]
```

## 开发注意事项

- 入口点: 生产环境用 `main.ts`，开发环境用 `dev.ts`
- Fresh 自动生成 `fresh.gen.ts` 清单，无需手动编辑
- 通过 `$std/dotenv/load.ts` 加载环境变量
- 客户端交互代码必须放在 `islands/` 目录
- 服务端组件放在 `components/` 目录进行 SSR
- TypeScript 严格模式已启用，配置 Preact JSX 运行时
- 使用 `IS_BROWSER` 判断运行环境，避免 SSR 问题

## 标准路由表

| 路径               | 页面       | 权限     |
| ------------------ | ---------- | -------- |
| `/`                | 首页       | 公开     |
| `/about`           | 关于       | 公开     |
| `/login`           | 登录       | 公开     |
| `/register`        | 注册       | 公开     |
| `/forgot-password` | 忘记密码   | 公开     |
| `/reset-password`  | 重置密码   | 公开     |
| `/dashboard`       | 仪表盘     | 登录即可 |
| `/profile`         | 个人中心   | 登录即可 |
| `/admin`           | 管理页面   | 需要权限 |
| `/components`      | 组件演示   | 公开     |
| `/hooks`           | Hooks 演示 | 公开     |
| `/state`           | 状态演示   | 公开     |
| `/status/*`        | 错误状态页 | 公开     |

## API 路由表

| 路径                               | 方法           | 说明                   |
| ---------------------------------- | -------------- | ---------------------- |
| `/api/auth/github`                 | GET            | GitHub OAuth 入口      |
| `/api/auth/callback`               | GET            | OAuth 回调处理         |
| `/api/auth/me`                     | GET            | 获取当前用户           |
| `/api/auth/logout`                 | POST           | 登出                   |
| `/api/dashboard/stats`             | GET            | 仪表盘统计数据         |
| `/api/dashboard/visits`            | GET            | 访问趋势数据           |
| `/api/dashboard/activities`        | GET            | 活动数据               |
| `/api/users`                       | GET/POST       | 用户列表/创建          |
| `/api/users/:id`                   | GET/PUT/DELETE | 用户详情/更新/删除     |
| `/api/documents`                   | GET/POST       | 文档列表/创建          |
| `/api/documents/:id`               | GET/PUT/DELETE | 文档详情/更新/删除     |
| `/api/notifications`               | GET/POST       | 通知列表/创建          |
| `/api/notifications/:id`           | GET/PUT/DELETE | 通知详情/更新/删除     |
| `/api/notifications/unread-count`  | GET            | 未读通知数量           |
| `/api/notifications/mark-all-read` | POST           | 标记全部已读           |
| `/api/calendar/events`             | GET/POST       | 日历事件列表/创建      |
| `/api/calendar/events/:id`         | GET/PUT/DELETE | 日历事件详情/更新/删除 |

## 数据 Hooks 使用示例

```typescript
// 用户数据
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
  useUsers,
} from "../hooks";

const { data, loading, error, refetch } = useUsers({ page: 1, pageSize: 20 });
const { mutate: createUser, loading: creating } = useCreateUser({
  onSuccess: (user) => console.log("Created:", user),
});

// 仪表盘数据
import { useDashboardData } from "../hooks";

const { stats, visits, activities, loading, refetch } = useDashboardData();

// 通知数据
import {
  useMarkAllNotificationsAsRead,
  useNotifications,
  useUnreadNotificationCount,
} from "../hooks";

const { data: notifications } = useNotifications();
const { count: unreadCount } = useUnreadNotificationCount();
const { mutate: markAllRead } = useMarkAllNotificationsAsRead();
```

## Store 使用示例

```typescript
// 错误日志
import { useErrorStore } from "../stores";

const { errors, addError, markAllRead, clear, unreadCount } = useErrorStore();
addError({ message: "发生错误", source: "manual" });

// 标签页管理
import { useTabsStore } from "../stores";

const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabsStore();
const tabId = addTab({ title: "新页面", path: "/new-page" });

// UI 设置
import { useUiSettingsStore } from "../stores";

const { skin, showFooter, showTabBar, setSkin, toggleSidebar } =
  useUiSettingsStore();
setSkin("emerald");
```

## Provider 使用示例

```tsx
// 在 Islands 组件中使用 AppProviders
import { AppProviders } from "../providers";

export default function MyIsland() {
  return (
    <AppProviders pathname={globalThis.location?.pathname}>
      <YourComponent />
    </AppProviders>
  );
}

// 或单独使用特定 Provider
import { AuthProvider, ErrorProvider, ThemeProvider } from "../providers";

export default function CustomProviders({ children }) {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <ErrorProvider>
          {children}
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```
