/**
 * UI 设置状态管理
 * 用于管理界面布局和皮肤设置
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// 类型定义
// ============================================================================

export type SkinPreset =
  | "default"
  | "blue"
  | "emerald"
  | "amber"
  | "violet"
  | "rose"
  | "teal"
  | "slate"
  | "ocean"
  | "sunset"
  | "aurora";

interface UiSettingsState {
  skin: SkinPreset;
  showFooter: boolean;
  showTabBar: boolean;
  mobileHeaderFixed: boolean;
  mobileTabBarFixed: boolean;
  sidebarCollapsed: boolean;
  compactMode: boolean;
}

interface UiSettingsActions {
  setSkin: (skin: SkinPreset) => void;
  setShowFooter: (visible: boolean) => void;
  setShowTabBar: (visible: boolean) => void;
  setMobileHeaderFixed: (fixed: boolean) => void;
  setMobileTabBarFixed: (fixed: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setCompactMode: (compact: boolean) => void;
  resetSettings: () => void;
}

// ============================================================================
// 默认设置
// ============================================================================

const defaultSettings: UiSettingsState = {
  skin: "default",
  showFooter: true,
  showTabBar: true,
  mobileHeaderFixed: true,
  mobileTabBarFixed: true,
  sidebarCollapsed: false,
  compactMode: false,
};

// ============================================================================
// Store 实现
// ============================================================================

export const useUiSettingsStore = create<UiSettingsState & UiSettingsActions>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setSkin: (skin) => set({ skin }),

      setShowFooter: (visible) => set({ showFooter: visible }),

      setShowTabBar: (visible) => set({ showTabBar: visible }),

      setMobileHeaderFixed: (fixed) => set({ mobileHeaderFixed: fixed }),

      setMobileTabBarFixed: (fixed) => set({ mobileTabBarFixed: fixed }),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setCompactMode: (compact) => set({ compactMode: compact }),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: "ui-settings-storage",
    },
  ),
);

// ============================================================================
// 皮肤颜色映射
// ============================================================================

export const skinColors: Record<
  SkinPreset,
  { primary: string; accent: string }
> = {
  default: { primary: "#3b82f6", accent: "#60a5fa" },
  blue: { primary: "#2563eb", accent: "#3b82f6" },
  emerald: { primary: "#10b981", accent: "#34d399" },
  amber: { primary: "#f59e0b", accent: "#fbbf24" },
  violet: { primary: "#8b5cf6", accent: "#a78bfa" },
  rose: { primary: "#f43f5e", accent: "#fb7185" },
  teal: { primary: "#14b8a6", accent: "#2dd4bf" },
  slate: { primary: "#64748b", accent: "#94a3b8" },
  ocean: { primary: "#0ea5e9", accent: "#38bdf8" },
  sunset: { primary: "#f97316", accent: "#fb923c" },
  aurora: { primary: "#a855f7", accent: "#c084fc" },
};

export default useUiSettingsStore;
