/**
 * ScrollArea 组件
 * 自定义滚动区域组件
 */

import type { ComponentChildren, JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface ScrollAreaProps {
  /** 内容 */
  children: ComponentChildren;
  /** 最大高度 */
  maxHeight?: string | number;
  /** 方向 */
  orientation?: "vertical" | "horizontal" | "both";
  /** 是否隐藏滚动条 */
  hideScrollbar?: boolean;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 组件
// ============================================================================

/**
 * ScrollArea 滚动区域组件
 */
export function ScrollArea({
  children,
  maxHeight,
  orientation = "vertical",
  hideScrollbar = false,
  className,
}: ScrollAreaProps): JSX.Element {
  const style: Record<string, string | number> = {};
  if (maxHeight) {
    style.maxHeight = typeof maxHeight === "number"
      ? `${maxHeight}px`
      : maxHeight;
  }

  return (
    <div
      className={cn(
        "relative",
        orientation === "vertical" && "overflow-y-auto overflow-x-hidden",
        orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
        orientation === "both" && "overflow-auto",
        // 自定义滚动条样式
        !hideScrollbar &&
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500",
        hideScrollbar && "scrollbar-none",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default ScrollArea;
