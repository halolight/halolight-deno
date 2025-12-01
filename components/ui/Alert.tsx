/**
 * Alert 组件
 * 警告提示组件
 */

import type { ComponentChildren, JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export type AlertVariant = "default" | "info" | "success" | "warning" | "error";

export interface AlertProps {
  /** 标题 */
  title?: string;
  /** 内容 */
  children?: ComponentChildren;
  /** 变体样式 */
  variant?: AlertVariant;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 图标 */
  icon?: ComponentChildren;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 样式映射
// ============================================================================

const variantClasses: Record<AlertVariant, string> = {
  default:
    "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-200",
  info:
    "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
  success:
    "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
  warning:
    "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
  error:
    "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
};

const iconColors: Record<AlertVariant, string> = {
  default: "text-gray-500",
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

// ============================================================================
// 默认图标
// ============================================================================

const DefaultIcons: Record<AlertVariant, JSX.Element> = {
  default: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  info: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Alert 警告提示组件
 */
export function Alert({
  title,
  children,
  variant = "default",
  closable = false,
  onClose,
  icon,
  className,
}: AlertProps): JSX.Element {
  const displayIcon = icon ?? DefaultIcons[variant];

  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-lg border p-4",
        variantClasses[variant],
        className,
      )}
      role="alert"
    >
      {/* Icon */}
      {displayIcon && (
        <div className={cn("flex-shrink-0", iconColors[variant])}>
          {displayIcon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && <h5 className="font-medium mb-1">{title}</h5>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>

      {/* Close Button */}
      {closable && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "flex-shrink-0 p-1 rounded-md transition-colors",
            "hover:bg-black/10 dark:hover:bg-white/10",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            variant === "info" && "focus:ring-blue-500",
            variant === "success" && "focus:ring-green-500",
            variant === "warning" && "focus:ring-yellow-500",
            variant === "error" && "focus:ring-red-500",
          )}
          aria-label="关闭"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Alert;
