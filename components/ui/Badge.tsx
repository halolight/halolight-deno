/**
 * Badge 组件
 * 用于显示状态标签、标记等
 */

import type { ComponentChildren, JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning"
  | "info"
  | "error";

export interface BadgeProps {
  /** 内容 */
  children: ComponentChildren;
  /** 变体样式 */
  variant?: BadgeVariant;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 样式映射
// ============================================================================

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary-500 text-white border-transparent",
  primary: "bg-blue-500 text-white border-transparent",
  secondary:
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-transparent",
  destructive: "bg-red-500 text-white border-transparent",
  outline:
    "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
  success: "bg-green-500 text-white border-transparent",
  warning: "bg-yellow-500 text-white border-transparent",
  info: "bg-blue-500 text-white border-transparent",
  error: "bg-red-500 text-white border-transparent",
};

const sizeClasses = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-0.5 text-xs",
  lg: "px-2.5 py-1 text-sm",
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Badge 徽章组件
 */
export function Badge({
  children,
  variant = "default",
  size = "md",
  closable = false,
  onClose,
  className,
}: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full border font-medium whitespace-nowrap",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
      {closable && (
        <button
          type="button"
          onClick={onClose}
          className="ml-0.5 -mr-0.5 h-3.5 w-3.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 inline-flex items-center justify-center"
          aria-label="关闭"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3 w-3"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </span>
  );
}

// ============================================================================
// 状态徽章便捷组件
// ============================================================================

export interface StatusBadgeProps {
  /** 状态 */
  status: "active" | "inactive" | "suspended" | "pending" | string;
  /** 自定义类名 */
  className?: string;
}

const statusConfig: Record<string, { variant: BadgeVariant; label: string }> = {
  active: { variant: "success", label: "活跃" },
  inactive: { variant: "secondary", label: "未激活" },
  suspended: { variant: "destructive", label: "已停用" },
  pending: { variant: "warning", label: "待处理" },
  processing: { variant: "info", label: "处理中" },
  shipped: { variant: "info", label: "已发货" },
  delivered: { variant: "success", label: "已送达" },
  cancelled: { variant: "destructive", label: "已取消" },
};

/**
 * StatusBadge 状态徽章
 */
export function StatusBadge({
  status,
  className,
}: StatusBadgeProps): JSX.Element {
  const config = statusConfig[status] || {
    variant: "secondary" as BadgeVariant,
    label: status,
  };

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

export default Badge;
