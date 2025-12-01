/**
 * Separator 组件
 * 分割线组件
 */

import type { JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface SeparatorProps {
  /** 方向 */
  orientation?: "horizontal" | "vertical";
  /** 是否显示文本 */
  children?: string;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 组件
// ============================================================================

/**
 * Separator 分割线组件
 */
export function Separator({
  orientation = "horizontal",
  children,
  className,
}: SeparatorProps): JSX.Element {
  if (children) {
    // 带文本的分割线
    return (
      <div
        className={cn(
          "flex items-center gap-4",
          orientation === "vertical" && "flex-col h-full",
          className,
        )}
        role="separator"
      >
        <div
          className={cn(
            "bg-gray-200 dark:bg-gray-700",
            orientation === "horizontal" ? "h-px flex-1" : "w-px flex-1",
          )}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {children}
        </span>
        <div
          className={cn(
            "bg-gray-200 dark:bg-gray-700",
            orientation === "horizontal" ? "h-px flex-1" : "w-px flex-1",
          )}
        />
      </div>
    );
  }

  // 普通分割线
  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700 shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className,
      )}
      role="separator"
    />
  );
}

export default Separator;
