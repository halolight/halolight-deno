/**
 * 仪表盘状态管理
 * 管理仪表盘布局、小部件配置和编辑模式
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// 类型定义
// ============================================================================

/** 小部件类型 */
export type WidgetType =
  | "stats"
  | "chart-line"
  | "chart-bar"
  | "chart-pie"
  | "recent-users"
  | "notifications"
  | "tasks"
  | "calendar"
  | "quick-actions";

/** 仪表盘小部件 */
export interface DashboardWidget {
  /** 唯一标识 */
  id: string;
  /** 小部件类型 */
  type: WidgetType;
  /** 小部件标题 */
  title: string;
}

/** 仪表盘布局 */
export interface DashboardLayout {
  /** 小部件ID */
  i: string;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 宽度 */
  w: number;
  /** 高度 */
  h: number;
  /** 最小宽度 */
  minW?: number;
  /** 最小高度 */
  minH?: number;
}

/** 小部件模板 */
export interface WidgetTemplate {
  type: WidgetType;
  title: string;
  description: string;
  icon: string;
  defaultLayout: { w: number; h: number; minW: number; minH: number };
}

// ============================================================================
// 小部件模板配置
// ============================================================================

export const widgetTemplates: WidgetTemplate[] = [
  {
    type: "stats",
    title: "统计概览",
    description: "显示关键业务指标",
    icon: "BarChart3",
    defaultLayout: { w: 12, h: 2, minW: 6, minH: 2 },
  },
  {
    type: "chart-line",
    title: "访问趋势",
    description: "折线图展示访问趋势",
    icon: "LineChart",
    defaultLayout: { w: 6, h: 4, minW: 4, minH: 3 },
  },
  {
    type: "chart-bar",
    title: "销售数据",
    description: "柱状图展示销售数据",
    icon: "BarChart",
    defaultLayout: { w: 6, h: 4, minW: 4, minH: 3 },
  },
  {
    type: "chart-pie",
    title: "来源分布",
    description: "饼图展示流量来源",
    icon: "PieChart",
    defaultLayout: { w: 4, h: 4, minW: 3, minH: 3 },
  },
  {
    type: "recent-users",
    title: "最近用户",
    description: "显示最近注册的用户",
    icon: "Users",
    defaultLayout: { w: 4, h: 4, minW: 3, minH: 3 },
  },
  {
    type: "notifications",
    title: "通知",
    description: "显示最新通知",
    icon: "Bell",
    defaultLayout: { w: 4, h: 4, minW: 3, minH: 3 },
  },
  {
    type: "tasks",
    title: "任务",
    description: "显示待处理任务",
    icon: "CheckSquare",
    defaultLayout: { w: 4, h: 4, minW: 3, minH: 3 },
  },
  {
    type: "calendar",
    title: "日历",
    description: "显示今日日程",
    icon: "Calendar",
    defaultLayout: { w: 4, h: 4, minW: 3, minH: 3 },
  },
  {
    type: "quick-actions",
    title: "快捷操作",
    description: "常用操作入口",
    icon: "Zap",
    defaultLayout: { w: 4, h: 3, minW: 3, minH: 2 },
  },
];

// ============================================================================
// 默认配置
// ============================================================================

const defaultWidgets: DashboardWidget[] = [
  { id: "stats-1", type: "stats", title: "统计概览" },
  { id: "chart-line-1", type: "chart-line", title: "访问趋势" },
  { id: "chart-bar-1", type: "chart-bar", title: "销售数据" },
  { id: "recent-users-1", type: "recent-users", title: "最近用户" },
  { id: "notifications-1", type: "notifications", title: "通知" },
  { id: "quick-actions-1", type: "quick-actions", title: "快捷操作" },
];

const defaultLayouts: DashboardLayout[] = [
  { i: "stats-1", x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
  { i: "chart-line-1", x: 0, y: 2, w: 6, h: 4, minW: 4, minH: 3 },
  { i: "chart-bar-1", x: 6, y: 2, w: 6, h: 4, minW: 4, minH: 3 },
  { i: "recent-users-1", x: 0, y: 6, w: 4, h: 4, minW: 3, minH: 3 },
  { i: "notifications-1", x: 4, y: 6, w: 4, h: 4, minW: 3, minH: 3 },
  { i: "quick-actions-1", x: 8, y: 6, w: 4, h: 3, minW: 3, minH: 2 },
];

// ============================================================================
// Store 定义
// ============================================================================

interface DashboardState {
  /** 小部件列表 */
  widgets: DashboardWidget[];
  /** 布局配置 */
  layouts: DashboardLayout[];
  /** 是否处于编辑模式 */
  isEditing: boolean;
  /** 刷新时间戳 */
  lastRefresh: number;
}

interface DashboardActions {
  /** 设置小部件列表 */
  setWidgets: (widgets: DashboardWidget[]) => void;
  /** 设置布局 */
  setLayouts: (layouts: DashboardLayout[]) => void;
  /** 设置编辑模式 */
  setIsEditing: (editing: boolean) => void;
  /** 添加小部件 */
  addWidget: (widget: Omit<DashboardWidget, "id">) => void;
  /** 移除小部件 */
  removeWidget: (id: string) => void;
  /** 重置为默认配置 */
  resetToDefault: () => void;
  /** 刷新仪表盘 */
  refresh: () => void;
}

export const useDashboardStore = create<DashboardState & DashboardActions>()(
  persist(
    (set, get) => ({
      widgets: defaultWidgets,
      layouts: defaultLayouts,
      isEditing: false,
      lastRefresh: Date.now(),

      setWidgets: (widgets) => set({ widgets }),

      setLayouts: (layouts) => set({ layouts }),

      setIsEditing: (isEditing) => set({ isEditing }),

      addWidget: (widget) => {
        const id = `${widget.type}-${Date.now()}`;
        const template = widgetTemplates.find((t) => t.type === widget.type);
        const defaultLayout = template?.defaultLayout ??
          { w: 4, h: 3, minW: 2, minH: 2 };

        // 计算新位置（放在最下面）
        const { layouts, widgets } = get();
        const maxY = layouts.reduce((max, l) => Math.max(max, l.y + l.h), 0);

        const newWidget: DashboardWidget = { ...widget, id };
        const newLayout: DashboardLayout = {
          i: id,
          x: 0,
          y: maxY,
          ...defaultLayout,
        };

        set({
          widgets: [...widgets, newWidget],
          layouts: [...layouts, newLayout],
        });
      },

      removeWidget: (id) => {
        const { widgets, layouts } = get();
        set({
          widgets: widgets.filter((w) => w.id !== id),
          layouts: layouts.filter((l) => l.i !== id),
        });
      },

      resetToDefault: () =>
        set({
          widgets: defaultWidgets,
          layouts: defaultLayouts,
          isEditing: false,
        }),

      refresh: () => set({ lastRefresh: Date.now() }),
    }),
    {
      name: "dashboard-store",
      partialize: (state) => ({
        widgets: state.widgets,
        layouts: state.layouts,
      }),
    },
  ),
);

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 获取小部件模板
 */
export function getWidgetTemplate(
  type: WidgetType,
): WidgetTemplate | undefined {
  return widgetTemplates.find((t) => t.type === type);
}

/**
 * 创建新小部件
 */
export function createWidget(
  type: WidgetType,
  title?: string,
): DashboardWidget {
  const template = getWidgetTemplate(type);
  return {
    id: `${type}-${Date.now()}`,
    type,
    title: title ?? template?.title ?? "未命名部件",
  };
}
