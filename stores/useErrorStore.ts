/**
 * 错误状态管理
 * 用于全局错误日志收集和展示
 */

import { create } from "zustand";

// ============================================================================
// 类型定义
// ============================================================================

export type ErrorSource = "error" | "promise" | "manual";

export interface ErrorLog {
  id: string;
  message: string;
  detail?: string;
  timestamp: number;
  source: ErrorSource;
  read?: boolean;
}

interface ErrorState {
  errors: ErrorLog[];
}

interface ErrorActions {
  addError: (log: Omit<ErrorLog, "id" | "timestamp" | "read">) => void;
  markAllRead: () => void;
  markAsRead: (id: string) => void;
  clear: () => void;
  removeError: (id: string) => void;
  unreadCount: () => number;
}

// ============================================================================
// Store 实现
// ============================================================================

export const useErrorStore = create<ErrorState & ErrorActions>((set, get) => ({
  errors: [],

  addError: (log) =>
    set((state) => ({
      errors: [
        {
          id: `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
          timestamp: Date.now(),
          read: false,
          ...log,
        },
        ...state.errors,
      ].slice(0, 50), // 保留最近 50 条
    })),

  markAllRead: () =>
    set((state) => ({
      errors: state.errors.map((e) => ({ ...e, read: true })),
    })),

  markAsRead: (id) =>
    set((state) => ({
      errors: state.errors.map((e) => e.id === id ? { ...e, read: true } : e),
    })),

  clear: () => set({ errors: [] }),

  removeError: (id) =>
    set((state) => ({
      errors: state.errors.filter((e) => e.id !== id),
    })),

  unreadCount: () => get().errors.filter((e) => !e.read).length,
}));

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 全局错误捕获初始化
 * 在应用入口处调用
 */
export function initErrorCapture() {
  if (
    typeof globalThis !== "undefined" &&
    typeof globalThis.addEventListener === "function"
  ) {
    // 捕获未处理的错误
    globalThis.addEventListener("error", (event) => {
      useErrorStore.getState().addError({
        message: event.message || "未知错误",
        detail: event.filename
          ? `${event.filename}:${event.lineno}:${event.colno}`
          : undefined,
        source: "error",
      });
    });

    // 捕获未处理的 Promise 拒绝
    globalThis.addEventListener("unhandledrejection", (event) => {
      useErrorStore.getState().addError({
        message: event.reason?.message || String(event.reason) ||
          "Promise 拒绝",
        detail: event.reason?.stack,
        source: "promise",
      });
    });
  }
}

export default useErrorStore;
