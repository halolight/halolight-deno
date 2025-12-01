/**
 * Tabs 组件
 * 选项卡组件
 */

import type { ComponentChildren, JSX } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface TabItem {
  /** 唯一标识 */
  key: string;
  /** 标签文本 */
  label: string;
  /** 图标 */
  icon?: ComponentChildren;
  /** 内容 */
  content?: ComponentChildren;
  /** 是否禁用 */
  disabled?: boolean;
  /** 徽章数量 */
  badge?: number;
}

export interface TabsProps {
  /** 选项卡列表 */
  items: TabItem[];
  /** 当前激活的 key */
  activeKey?: string;
  /** 默认激活的 key */
  defaultActiveKey?: string;
  /** 切换回调 */
  onChange?: (key: string) => void;
  /** 变体样式 */
  variant?: "line" | "pills" | "bordered";
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 是否撑满宽度 */
  fullWidth?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 标签栏类名 */
  tabListClassName?: string;
  /** 内容区类名 */
  contentClassName?: string;
}

// ============================================================================
// 样式映射
// ============================================================================

const variantClasses = {
  line: {
    list: "border-b border-gray-200 dark:border-gray-700",
    tab: "border-b-2 border-transparent -mb-px",
    active: "border-primary-500 text-primary-600 dark:text-primary-400",
    inactive:
      "text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300",
  },
  pills: {
    list: "gap-2",
    tab: "rounded-md",
    active: "bg-primary-500 text-white",
    inactive:
      "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
  },
  bordered: {
    list: "border border-gray-200 dark:border-gray-700 rounded-lg p-1 gap-1",
    tab: "rounded-md",
    active: "bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-gray-100",
    inactive:
      "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
  },
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Tabs 选项卡组件
 */
export function Tabs({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  variant = "line",
  size = "md",
  fullWidth = false,
  className,
  tabListClassName,
  contentClassName,
}: TabsProps): JSX.Element {
  const [internalActiveKey, setInternalActiveKey] = useState(
    activeKey || defaultActiveKey || items[0]?.key,
  );

  const currentKey = activeKey ?? internalActiveKey;
  const variantStyle = variantClasses[variant];

  const handleTabClick = (key: string, disabled?: boolean) => {
    if (disabled) return;
    setInternalActiveKey(key);
    onChange?.(key);
  };

  const activeItem = items.find((item) => item.key === currentKey);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab List */}
      <div
        className={cn(
          "flex",
          variantStyle.list,
          fullWidth && "w-full",
          tabListClassName,
        )}
        role="tablist"
      >
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={item.key === currentKey}
            aria-controls={`tabpanel-${item.key}`}
            disabled={item.disabled}
            onClick={() => handleTabClick(item.key, item.disabled)}
            className={cn(
              "inline-flex items-center justify-center gap-2 font-medium transition-all",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              sizeClasses[size],
              variantStyle.tab,
              item.key === currentKey
                ? variantStyle.active
                : variantStyle.inactive,
              fullWidth && "flex-1",
            )}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 text-xs font-medium rounded-full",
                  item.key === currentKey
                    ? variant === "pills"
                      ? "bg-white/20 text-white"
                      : "bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
                )}
              >
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeItem?.content && (
        <div
          id={`tabpanel-${currentKey}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentKey}`}
          className={cn("mt-4", contentClassName)}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}

export default Tabs;
