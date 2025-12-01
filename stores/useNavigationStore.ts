/**
 * 导航状态管理
 * 用于跟踪页面导航状态和来源
 */

import { create } from "zustand";

// ============================================================================
// 类型定义
// ============================================================================

export type NavigationSource =
  | "command"
  | "sidebar"
  | "tabbar"
  | "tabbar-refresh"
  | "header"
  | "footer"
  | "other";

interface NavigationState {
  pendingPath: string | null;
  label: string | null;
  source: NavigationSource | null;
  isNavigating: boolean;
}

interface NavigationActions {
  startNavigation: (options: {
    path: string;
    label?: string;
    source?: NavigationSource;
  }) => void;
  finishNavigation: () => void;
  cancelNavigation: () => void;
}

// ============================================================================
// Store 实现
// ============================================================================

export const useNavigationStore = create<NavigationState & NavigationActions>((
  set,
) => ({
  pendingPath: null,
  label: null,
  source: null,
  isNavigating: false,

  startNavigation: ({ path, label, source }) =>
    set({
      pendingPath: path,
      label: label ?? path,
      source: source ?? "other",
      isNavigating: true,
    }),

  finishNavigation: () =>
    set({
      pendingPath: null,
      label: null,
      source: null,
      isNavigating: false,
    }),

  cancelNavigation: () =>
    set({
      pendingPath: null,
      label: null,
      source: null,
      isNavigating: false,
    }),
}));

// ============================================================================
// 辅助 Hook
// ============================================================================

/**
 * 导航工具函数
 */
export const navigationUtils = {
  /**
   * 使用路由导航
   */
  navigate: (
    path: string,
    options?: { label?: string; source?: NavigationSource },
  ) => {
    const store = useNavigationStore.getState();
    store.startNavigation({
      path,
      label: options?.label,
      source: options?.source,
    });

    // 实际导航
    if (typeof globalThis !== "undefined" && globalThis.location) {
      globalThis.location.href = path;
    }
  },

  /**
   * 获取当前导航状态
   */
  getState: () => useNavigationStore.getState(),
};

export default useNavigationStore;
