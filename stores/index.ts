// 统一导出所有状态管理

// 核心 stores
export { useAppStore } from "./useAppStore.ts";
export { useThemeStore } from "./useThemeStore.ts";
export { useUserStore } from "./useUserStore.ts";
export { authUtils, useAuthStore } from "./useAuthStore.ts";

// 功能 stores
export { useDashboardStore } from "./useDashboardStore.ts";
export { initErrorCapture, useErrorStore } from "./useErrorStore.ts";
export { useTabsStore } from "./useTabsStore.ts";
export { navigationUtils, useNavigationStore } from "./useNavigationStore.ts";
export { skinColors, useUiSettingsStore } from "./useUiSettingsStore.ts";

// 类型导出
export type { ErrorLog, ErrorSource } from "./useErrorStore.ts";
export type { Tab } from "./useTabsStore.ts";
export type { NavigationSource } from "./useNavigationStore.ts";
export type { SkinPreset } from "./useUiSettingsStore.ts";
export type {
  DashboardLayout,
  DashboardWidget,
  WidgetTemplate,
  WidgetType,
} from "./useDashboardStore.ts";
