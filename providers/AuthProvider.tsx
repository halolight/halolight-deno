/**
 * 认证 Provider
 * 管理用户认证状态和路由保护
 */

import type { ComponentChildren, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useAuthStore } from "../stores/useAuthStore.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface AuthProviderProps {
  children: ComponentChildren;
  /** 当前路径 */
  pathname?: string;
  /** 公开路由列表（不需要认证） */
  publicRoutes?: string[];
  /** 加载组件 */
  loadingComponent?: JSX.Element;
}

// ============================================================================
// 默认公开路由
// ============================================================================

const defaultPublicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// ============================================================================
// 加载组件
// ============================================================================

function DefaultLoadingComponent(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="h-8 w-8 animate-spin text-primary-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-sm text-gray-500 dark:text-gray-400">加载中...</p>
      </div>
    </div>
  );
}

// ============================================================================
// 组件实现
// ============================================================================

// 获取默认路径
function getDefaultPathname(): string {
  if (typeof globalThis !== "undefined" && globalThis.location) {
    return globalThis.location.pathname || "/";
  }
  return "/";
}

export function AuthProvider({
  children,
  pathname,
  publicRoutes = defaultPublicRoutes,
  loadingComponent,
}: AuthProviderProps): JSX.Element {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // 使用传入的 pathname 或获取默认值
  const currentPath = pathname ?? getDefaultPathname();

  const isPublicRoute = publicRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  useEffect(() => {
    const initAuth = async () => {
      if (typeof localStorage === "undefined") {
        setIsInitialized(true);
        return;
      }

      const hasPersistedAuth = localStorage.getItem("auth-storage");
      // 先标记初始化完成，避免在公开页面被 checkAuth 阻塞导致跳转延迟
      setIsInitialized(true);

      if (!hasPersistedAuth || isPublicRoute) {
        await checkAuth();
      }
    };
    initAuth();
  }, [checkAuth, isPublicRoute]);

  useEffect(() => {
    if (!isInitialized) return;
    if (typeof globalThis === "undefined" || !globalThis.location) return;

    // 已登录用户访问认证页面时重定向到首页
    if (isAuthenticated && isPublicRoute) {
      globalThis.location.href = "/";
    }
  }, [isInitialized, isAuthenticated, isPublicRoute]);

  // 公开路由不显示加载状态，避免登录页面闪烁
  const shouldShowLoading = !isInitialized ||
    (!isAuthenticated && !isPublicRoute && isLoading);

  if (shouldShowLoading) {
    return loadingComponent || <DefaultLoadingComponent />;
  }

  return <>{children}</>;
}

export default AuthProvider;
