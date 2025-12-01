/**
 * API 客户端
 * 提供统一的 HTTP 请求接口和认证处理
 */

import { mockRoles } from "./mock-data.ts";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Role,
  User,
} from "./types.ts";

// ============================================================================
// 配置
// ============================================================================

// 检查是否在浏览器环境，Deno.env 只在服务端可用
function getApiBaseUrl(): string {
  try {
    if (
      typeof Deno !== "undefined" && Deno.env &&
      typeof Deno.env.get === "function"
    ) {
      return Deno.env.get("API_URL") || "/api";
    }
  } catch {
    // 客户端环境，Deno.env 不可用
  }
  return "/api";
}
const API_BASE_URL = getApiBaseUrl();

// ============================================================================
// Cookie 工具函数
// ============================================================================

/** 从 document.cookie 获取指定 cookie 值 */
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
function setCookie(
  name: string,
  value: string,
  days: number = 7,
): void {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

/** 删除 cookie */
function removeCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// ============================================================================
// HTTP 客户端
// ============================================================================

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * 通用请求函数
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...init } = options;

  // 构建 URL
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // 获取 token
  const token = getCookie("token");

  // 构建 headers
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // 发送请求
  const response = await fetch(url, {
    ...init,
    headers,
  });

  // 处理 401 未授权
  if (response.status === 401) {
    removeCookie("token");
    if (typeof globalThis !== "undefined" && globalThis.location) {
      globalThis.location.href = "/login";
    }
    throw new Error("未授权，请重新登录");
  }

  // 解析响应
  const data = await response.json();

  // 检查业务错误
  if (data.code && data.code !== 200) {
    throw new Error(data.message || "请求失败");
  }

  return data;
}

/**
 * API 客户端实例
 */
export const apiClient = {
  get: <T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ) => request<T>(endpoint, { method: "GET", params }),

  post: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};

// ============================================================================
// 账户类型
// ============================================================================

/** 带 token 的账户信息 */
export interface AccountWithToken extends User {
  token: string;
}

/** 当前用户响应 */
export interface CurrentUserResponse {
  user: AccountWithToken;
  accounts: AccountWithToken[];
}

// ============================================================================
// Mock 账户数据
// ============================================================================

/** 内置多账号示例（模拟多租户/多角色） */
const mockAccounts: AccountWithToken[] = [
  {
    id: "acc-admin",
    email: "admin@halolight.h7ml.cn",
    name: "主账号（管理员）",
    avatar: "/avatars/1.png",
    role: mockRoles[0],
    status: "active",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    token: "mock_token_acc-admin",
  },
  {
    id: "acc-ops",
    email: "ops@halolight.h7ml.cn",
    name: "日常运营账号",
    avatar: "/avatars/2.png",
    role: mockRoles[1],
    status: "active",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    token: "mock_token_acc-ops",
  },
  {
    id: "acc-editor",
    email: "editor@halolight.h7ml.cn",
    name: "内容编辑账号",
    avatar: "/avatars/3.png",
    role: mockRoles[2],
    status: "active",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    token: "mock_token_acc-editor",
  },
];

/** 构建 token */
const buildToken = (accountId: string) => `mock_token_${accountId}`;

/** 根据邮箱查找账户 */
const findAccountByEmail = (email: string) =>
  mockAccounts.find((account) => account.email === email);

/** 根据 token 查找账户 */
const findAccountByToken = (token: string) =>
  mockAccounts.find((account) => account.token === token);

// ============================================================================
// 认证 API
// ============================================================================

/**
 * 认证相关 API
 */
export const authApi = {
  /**
   * 用户登录
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    const account = findAccountByEmail(data.email);
    if (!account || data.password !== "123456") {
      throw new Error("邮箱或密码错误");
    }

    const token = buildToken(account.id);
    const hydratedAccount: AccountWithToken = { ...account, token };

    // 设置 cookie
    setCookie("token", token, 7);

    return {
      user: hydratedAccount,
      token,
      expiresIn: 86400,
    };
  },

  /**
   * 用户注册
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (data.password !== data.confirmPassword) {
      throw new Error("两次密码输入不一致");
    }

    // 检查邮箱是否已存在
    if (findAccountByEmail(data.email)) {
      throw new Error("该邮箱已被注册");
    }

    const accountId = `acc-${Date.now()}`;
    const newAccount: AccountWithToken = {
      id: accountId,
      email: data.email,
      name: data.name,
      avatar: "/avatars/4.png",
      role: mockRoles[3], // viewer 角色
      status: "active",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      token: buildToken(accountId),
    };

    mockAccounts.push(newAccount);

    // 设置 cookie
    setCookie("token", newAccount.token, 7);

    return {
      user: newAccount,
      token: newAccount.token,
      expiresIn: 86400,
    };
  },

  /**
   * 忘记密码
   */
  forgotPassword: async (email: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("发送重置密码邮件到:", email);
  },

  /**
   * 重置密码
   */
  resetPassword: async (token: string, password: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("重置密码:", token, password);
  },

  /**
   * 用户登出
   */
  logout: (): Promise<void> => {
    removeCookie("token");
    return Promise.resolve();
  },

  /**
   * 获取当前用户
   */
  getCurrentUser: (): Promise<CurrentUserResponse | null> => {
    const token = getCookie("token");
    if (!token) return Promise.resolve(null);

    const account = findAccountByToken(token);
    if (!account) return Promise.resolve(null);

    return Promise.resolve({
      user: account,
      accounts: [...mockAccounts],
    });
  },

  /**
   * 获取所有账户
   */
  getAccounts: async (): Promise<AccountWithToken[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...mockAccounts];
  },

  /**
   * 切换账户
   */
  switchAccount: async (
    accountId: string,
  ): Promise<AccountWithToken | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const account = mockAccounts.find((acc) => acc.id === accountId);
    if (!account) return null;

    // 更新 token
    setCookie("token", account.token, 7);

    return account;
  },
};

// ============================================================================
// 角色 API
// ============================================================================

/**
 * 角色相关 API
 */
export const roleApi = {
  /**
   * 获取所有角色
   */
  getRoles: async (): Promise<ApiResponse<Role[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      code: 200,
      message: "success",
      data: mockRoles,
    };
  },

  /**
   * 获取单个角色
   */
  getRole: async (id: string): Promise<ApiResponse<Role | undefined>> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const role = mockRoles.find((r) => r.id === id);
    return {
      code: role ? 200 : 404,
      message: role ? "success" : "角色不存在",
      data: role,
    };
  },
};

export default apiClient;
