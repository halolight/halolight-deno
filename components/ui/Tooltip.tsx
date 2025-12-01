/**
 * Tooltip 组件
 * 提示框组件
 */

import type { ComponentChildren, JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "right";

export interface TooltipProps {
  /** 触发元素 */
  children: ComponentChildren;
  /** 提示内容 */
  content: ComponentChildren;
  /** 位置 */
  placement?: TooltipPlacement;
  /** 延迟显示时间（毫秒） */
  delay?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 内容类名 */
  contentClassName?: string;
}

// ============================================================================
// 位置样式映射
// ============================================================================

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  "top-start": "bottom-full left-0 mb-2",
  "top-end": "bottom-full right-0 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  "bottom-start": "top-full left-0 mt-2",
  "bottom-end": "top-full right-0 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses: Record<TooltipPlacement, string> = {
  top:
    "top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700 border-x-transparent border-b-transparent",
  "top-start":
    "top-full left-3 border-t-gray-900 dark:border-t-gray-700 border-x-transparent border-b-transparent",
  "top-end":
    "top-full right-3 border-t-gray-900 dark:border-t-gray-700 border-x-transparent border-b-transparent",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700 border-x-transparent border-t-transparent",
  "bottom-start":
    "bottom-full left-3 border-b-gray-900 dark:border-b-gray-700 border-x-transparent border-t-transparent",
  "bottom-end":
    "bottom-full right-3 border-b-gray-900 dark:border-b-gray-700 border-x-transparent border-t-transparent",
  left:
    "left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700 border-y-transparent border-r-transparent",
  right:
    "right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700 border-y-transparent border-l-transparent",
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Tooltip 提示框组件
 */
export function Tooltip({
  children,
  content,
  placement = "top",
  delay = 200,
  disabled = false,
  className,
  contentClassName,
}: TooltipProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && content && (
        <div
          className={cn(
            "absolute z-50 whitespace-nowrap",
            "px-2 py-1 text-xs font-medium",
            "text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg",
            "animate-fade-in",
            placementClasses[placement],
            contentClassName,
          )}
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <span
            className={cn(
              "absolute border-4",
              arrowClasses[placement],
            )}
          />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
