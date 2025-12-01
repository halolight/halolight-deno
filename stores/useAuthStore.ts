/**
 * 用户认证状态管理 Store
 * 使用 Zustand 管理用户登录状态和用户信息
 * 支持多账户切换功能
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  LoginRequest,
  Permission,
  RegisterRequest,
} from "../lib/api/types.ts";
import { type AccountWithToken, authApi } from "../lib/api/client.ts";

// ============================================================================
// 类型定义
// ============================================================================

/** 认证状态接口 */
export interface AuthState {
  /** 当前用户 */
  user: AccountWithToken | null;
  /** 所有可用账户 */
  accounts: AccountWithToken[];
  /** 当前活跃账户 ID */
  activeAccountId: string | null;
  /** 当前 token */
  token: string | null;
  /** 加载状态 */
  isLoading: boolean;
  /** 是否已认证 */
  isAuthenticated: boolean;
  /** 错误信息 */
  error: string | null;

  // 操作方法
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  switchAccount: (accountId: string) => void;
  loadAccounts: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  updateUser: (updates: Partial<AccountWithToken>) => void;
}

// ============================================================================
// Cookie 工具函数
// ============================================================================

/** 获取 cookie */
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

/** 设置 cookie */
function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const secure = typeof location !== "undefined" &&
    location.protocol === "https:";
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;${
    secure ? "secure;" : ""
  }samesite=strict`;
}

/** 删除 cookie */
function removeCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// ============================================================================
// Store 创建
// ============================================================================

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: null,
      accounts: [],
      activeAccountId: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      /**
       * 用户登录
       */
      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(data);

          // 设置 cookie（remember 为 true 时保存 7 天，否则 1 天）
          const days = (data as LoginRequest & { remember?: boolean }).remember
            ? 7
            : 1;
          setCookie("token", response.token, days);

          // 将 user 和 token 合并成 AccountWithToken
          const accountWithToken: AccountWithToken = {
            ...response.user,
            token: response.token,
          };
          set({
            user: accountWithToken,
            token: response.token,
            activeAccountId: response.user.id,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "登录失败",
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * 用户注册
       */
      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);

          setCookie("token", response.token, 1);

          // 将 user 和 token 合并成 AccountWithToken
          const accountWithToken: AccountWithToken = {
            ...response.user,
            token: response.token,
          };
          set({
            user: accountWithToken,
            token: response.token,
            activeAccountId: response.user.id,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "注册失败",
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * 用户登出
       */
      logout: async () => {
        set({ isLoading: true });
        try {
          await authApi.logout();
        } finally {
          removeCookie("token");
          set({
            user: null,
            token: null,
            accounts: [],
            activeAccountId: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      /**
       * 切换账户
       */
      switchAccount: (accountId: string) => {
        const account = get().accounts.find((item) => item.id === accountId);
        if (!account) {
          set({ error: "账号不存在" });
          throw new Error("账号不存在");
        }

        setCookie("token", account.token, 7);
        set({
          user: account,
          token: account.token,
          activeAccountId: account.id,
          isAuthenticated: true,
          error: null,
        });
      },

      /**
       * 加载所有账户
       */
      loadAccounts: async () => {
        set({ isLoading: true });
        try {
          const accounts = await authApi.getAccounts();
          const { activeAccountId, token, user } = get();
          const nextUser = accounts.find((acc) => acc.id === activeAccountId) ||
            accounts.find((acc) => acc.token === token) ||
            user ||
            null;

          if (nextUser) {
            setCookie("token", nextUser.token, 7);
          } else {
            removeCookie("token");
          }

          set({
            accounts,
            user: nextUser,
            activeAccountId: nextUser?.id ?? null,
            token: nextUser?.token ?? null,
            isAuthenticated: Boolean(nextUser),
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "加载账号失败",
            isLoading: false,
          });
        }
      },

      /**
       * 忘记密码
       */
      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.forgotPassword(email);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "发送失败",
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * 重置密码
       */
      resetPassword: async (token: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.resetPassword(token, password);
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "重置失败",
            isLoading: false,
          });
          throw error;
        }
      },

      /**
       * 检查认证状态
       */
      checkAuth: async () => {
        const token = getCookie("token");
        const { accounts } = get();

        if (!token) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            activeAccountId: null,
            isLoading: false,
          });
          return;
        }

        // 先从缓存账户中查找
        const cachedAccount = accounts.find((acc) => acc.token === token);
        if (cachedAccount) {
          set({
            user: cachedAccount,
            token,
            activeAccountId: cachedAccount.id,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }

        // 从服务器获取
        set({ isLoading: true });
        try {
          const response = await authApi.getCurrentUser();
          if (response?.user) {
            set({
              user: response.user,
              token,
              accounts: response.accounts,
              activeAccountId: response.user.id,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            removeCookie("token");
            set({
              isAuthenticated: false,
              user: null,
              token: null,
              activeAccountId: null,
              accounts: [],
              isLoading: false,
            });
          }
        } catch {
          removeCookie("token");
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            activeAccountId: null,
            accounts: [],
            isLoading: false,
          });
        }
      },

      /**
       * 清除错误
       */
      clearError: () => set({ error: null }),

      /**
       * 更新用户信息
       */
      updateUser: (updates: Partial<AccountWithToken>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        accounts: state.accounts,
        activeAccountId: state.activeAccountId,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// ============================================================================
// 工具函数
// ============================================================================

/** 认证相关的工具函数 */
export const authUtils = {
  /**
   * 检查用户是否已登录
   */
  isLoggedIn: (): boolean => {
    return useAuthStore.getState().isAuthenticated;
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: (): AccountWithToken | null => {
    return useAuthStore.getState().user;
  },

  /**
   * 获取用户权限列表
   */
  getPermissions: (): Permission[] => {
    const user = useAuthStore.getState().user;
    return user?.role.permissions || [];
  },

  /**
   * 检查用户是否有特定权限
   */
  hasPermission: (permission: Permission | "*"): boolean => {
    const user = useAuthStore.getState().user;
    if (!user) return false;

    const permissions = user.role.permissions;

    // 超级管理员权限
    if (permissions.includes("*" as Permission)) return true;

    // 精确匹配
    if (permissions.includes(permission as Permission)) return true;

    // 通配符匹配 (如 users:* 匹配 users:view)
    const [resource] = permission.split(":");
    if (permissions.includes(`${resource}:*` as Permission)) return true;

    return false;
  },

  /**
   * 检查用户是否有任意一个权限
   */
  hasAnyPermission: (permissions: (Permission | "*")[]): boolean => {
    return permissions.some((p) => authUtils.hasPermission(p));
  },

  /**
   * 检查用户是否有所有权限
   */
  hasAllPermissions: (permissions: (Permission | "*")[]): boolean => {
    return permissions.every((p) => authUtils.hasPermission(p));
  },

  /**
   * 获取用户头像 URL
   */
  getUserAvatar: (): string => {
    const user = useAuthStore.getState().user;
    if (user?.avatar) {
      return user.avatar;
    }
    return "/avatars/default.png";
  },

  /**
   * 获取用户显示名称
   */
  getDisplayName: (): string => {
    const user = useAuthStore.getState().user;
    return user?.name || user?.email || "未知用户";
  },

  /**
   * 获取用户角色标签
   */
  getRoleLabel: (): string => {
    const user = useAuthStore.getState().user;
    return user?.role.label || "未知角色";
  },

  /**
   * 启动 GitHub 登录流程
   */
  startGitHubLogin: (redirectTo = "/") => {
    const loginUrl = `/api/auth/github?redirect=${
      encodeURIComponent(redirectTo)
    }`;
    if (typeof globalThis.location !== "undefined") {
      globalThis.location.href = loginUrl;
    }
  },

  /**
   * 跳转到登录页面
   */
  redirectToLogin: (returnUrl?: string) => {
    if (typeof globalThis.location !== "undefined") {
      const url = returnUrl
        ? `/login?returnUrl=${encodeURIComponent(returnUrl)}`
        : "/login";
      globalThis.location.href = url;
    }
  },
};
