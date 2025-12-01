/**
 * StateDemo Island 组件
 * 状态管理演示的客户端交互组件
 */

import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import Button from "../components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.tsx";

// 用户类型定义
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function StateDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 应用状态 */}
      <AppStateDemo />

      {/* 主题状态 */}
      <ThemeStateDemo />

      {/* 用户状态 */}
      <UserStateDemo />

      {/* 状态持久化演示 */}
      <PersistenceDemo />
    </div>
  );
}

// 应用状态演示
function AppStateDemo() {
  // 客户端状态 - 避免 SSR 时调用 Zustand
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 客户端初始化 store 订阅
  useEffect(() => {
    if (!IS_BROWSER) return;

    const initStore = async () => {
      const { useAppStore } = await import("../stores/useAppStore.ts");

      const unsubscribe = useAppStore.subscribe((state) => {
        setIsLoading(state.isLoading);
        setError(state.error);
        setSidebarOpen(state.sidebarOpen);
      });

      const state = useAppStore.getState();
      setIsLoading(state.isLoading);
      setError(state.error);
      setSidebarOpen(state.sidebarOpen);

      return unsubscribe;
    };

    initStore();
  }, []);

  const handleSetLoading = async (value: boolean) => {
    if (!IS_BROWSER) return;
    const { useAppStore } = await import("../stores/useAppStore.ts");
    useAppStore.getState().setLoading(value);
  };

  const handleSetError = async (value: string | null) => {
    if (!IS_BROWSER) return;
    const { useAppStore } = await import("../stores/useAppStore.ts");
    useAppStore.getState().setError(value);
  };

  const handleToggleSidebar = async () => {
    if (!IS_BROWSER) return;
    const { useAppStore } = await import("../stores/useAppStore.ts");
    useAppStore.getState().toggleSidebar();
  };

  const handleSetSidebarOpen = async (value: boolean) => {
    if (!IS_BROWSER) return;
    const { useAppStore } = await import("../stores/useAppStore.ts");
    useAppStore.getState().setSidebarOpen(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>应用状态 (useAppStore)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">加载状态:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={isLoading ? "primary" : "outline"}
                  onClick={() => handleSetLoading(!isLoading)}
                >
                  {isLoading ? "停止加载" : "开始加载"}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">侧边栏:</span>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleToggleSidebar}>
                  切换
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSetSidebarOpen(true)}
                >
                  打开
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSetSidebarOpen(false)}
                >
                  关闭
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm">错误信息:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleSetError("这是一个测试错误")}
                >
                  设置错误
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSetError(null)}
                >
                  清除错误
                </Button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm space-y-1">
            <div>加载中: {isLoading ? "是" : "否"}</div>
            <div>侧边栏: {sidebarOpen ? "打开" : "关闭"}</div>
            <div>错误: {error || "无"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 主题状态演示
function ThemeStateDemo() {
  // 客户端状态 - 避免 SSR 时调用 Zustand
  const [theme, setThemeState] = useState<"light" | "dark" | "system">(
    "system",
  );
  const [isDark, setIsDark] = useState(false);

  // 客户端初始化 store 订阅
  useEffect(() => {
    if (!IS_BROWSER) return;

    const initStore = async () => {
      const { useThemeStore } = await import("../stores/useThemeStore.ts");

      const unsubscribe = useThemeStore.subscribe((state) => {
        setThemeState(state.theme);
        setIsDark(state.isDark);
      });

      const state = useThemeStore.getState();
      setThemeState(state.theme);
      setIsDark(state.isDark);

      return unsubscribe;
    };

    initStore();
  }, []);

  const handleSetTheme = async (value: "light" | "dark" | "system") => {
    if (!IS_BROWSER) return;
    const { useThemeStore } = await import("../stores/useThemeStore.ts");
    useThemeStore.getState().setTheme(value);
  };

  const handleToggleTheme = async () => {
    if (!IS_BROWSER) return;
    const { useThemeStore } = await import("../stores/useThemeStore.ts");
    useThemeStore.getState().toggleTheme();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>主题状态 (useThemeStore)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">当前主题:</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-blue-800 dark:text-blue-200 text-sm">
                {theme}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant={theme === "light" ? "primary" : "outline"}
                onClick={() => handleSetTheme("light")}
              >
                亮色
              </Button>
              <Button
                size="sm"
                variant={theme === "dark" ? "primary" : "outline"}
                onClick={() => handleSetTheme("dark")}
              >
                暗色
              </Button>
              <Button
                size="sm"
                variant={theme === "system" ? "primary" : "outline"}
                onClick={() => handleSetTheme("system")}
              >
                系统
              </Button>
            </div>

            <Button size="sm" variant="secondary" onClick={handleToggleTheme}>
              快速切换
            </Button>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm space-y-1">
            <div>主题模式: {theme}</div>
            <div>当前是暗色: {isDark ? "是" : "否"}</div>
            <div>HTML类名: {isDark ? "dark" : "light"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 用户状态演示
function UserStateDemo() {
  // 客户端状态 - 避免 SSR 时调用 Zustand
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 客户端初始化 store 订阅
  useEffect(() => {
    if (!IS_BROWSER) return;

    const initStore = async () => {
      const { useUserStore } = await import("../stores/useUserStore.ts");

      const unsubscribe = useUserStore.subscribe((state) => {
        setUser(state.user);
        setIsAuthenticated(state.isAuthenticated);
      });

      const state = useUserStore.getState();
      setUser(state.user);
      setIsAuthenticated(state.isAuthenticated);

      return unsubscribe;
    };

    initStore();
  }, []);

  const handleLogin = async () => {
    if (!IS_BROWSER) return;
    const { useUserStore } = await import("../stores/useUserStore.ts");
    useUserStore.getState().login({
      id: "1",
      name: "张三",
      email: "zhangsan@example.com",
      role: "user",
    });
  };

  const handleLogout = async () => {
    if (!IS_BROWSER) return;
    const { useUserStore } = await import("../stores/useUserStore.ts");
    useUserStore.getState().logout();
  };

  const handleUpdateName = async () => {
    if (!IS_BROWSER || !user) return;
    const { useUserStore } = await import("../stores/useUserStore.ts");
    useUserStore.getState().updateUser({ name: "李四" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>用户状态 (useUserStore)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">登录状态:</span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  isAuthenticated
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}
              >
                {isAuthenticated ? "已登录" : "未登录"}
              </span>
            </div>

            <div className="flex gap-2">
              {!isAuthenticated
                ? (
                  <Button size="sm" onClick={handleLogin}>
                    模拟登录
                  </Button>
                )
                : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleUpdateName}
                    >
                      更新姓名
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleLogout}
                    >
                      退出登录
                    </Button>
                  </>
                )}
            </div>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm space-y-1">
            {user
              ? (
                <>
                  <div>ID: {user.id}</div>
                  <div>姓名: {user.name}</div>
                  <div>邮箱: {user.email}</div>
                  <div>角色: {user.role}</div>
                </>
              )
              : <div>未登录</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 状态持久化演示
function PersistenceDemo() {
  const handleClearStorage = () => {
    if (!IS_BROWSER) return;
    localStorage.clear();
    globalThis.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>状态持久化</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            以下状态会自动保存到本地存储：
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>侧边栏开关状态</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>主题偏好设置</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>用户登录信息</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              刷新页面或重新打开浏览器，这些状态都会被保持。
            </p>
          </div>

          <Button size="sm" variant="outline" onClick={handleClearStorage}>
            清除所有本地数据
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
