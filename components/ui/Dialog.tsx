/**
 * Dialog 组件
 * 对话框/模态框组件
 */

import type { ComponentChildren, JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface DialogProps {
  /** 是否打开 */
  open: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 标题 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 内容 */
  children?: ComponentChildren;
  /** 底部操作区 */
  footer?: ComponentChildren;
  /** 尺寸 */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** 是否点击遮罩关闭 */
  closeOnOverlayClick?: boolean;
  /** 是否显示关闭按钮 */
  showCloseButton?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 内容区类名 */
  contentClassName?: string;
}

// ============================================================================
// 尺寸映射
// ============================================================================

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

// ============================================================================
// 组件
// ============================================================================

/**
 * Dialog 对话框组件
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
  contentClassName,
}: DialogProps): JSX.Element | null {
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  // 锁定背景滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 打开时聚焦对话框
  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (e: MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dialog-title" : undefined}
      aria-describedby={description ? "dialog-description" : undefined}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          "relative w-full",
          "bg-white dark:bg-gray-900",
          "rounded-lg shadow-xl",
          "animate-slide-up",
          sizeClasses[size],
          className,
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            <div>
              {title && (
                <h2
                  id="dialog-title"
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="dialog-description"
                  className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "p-2 -m-2 rounded-md",
                  "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500",
                )}
                aria-label="关闭"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn("px-6 py-4", contentClassName)}>{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// AlertDialog 确认对话框
// ============================================================================

export interface AlertDialogProps {
  /** 是否打开 */
  open: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 确认回调 */
  onConfirm: () => void;
  /** 标题 */
  title: string;
  /** 描述 */
  description?: string;
  /** 确认按钮文本 */
  confirmText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 是否危险操作 */
  danger?: boolean;
  /** 加载状态 */
  loading?: boolean;
}

/**
 * AlertDialog 确认对话框
 */
export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "确认",
  cancelText = "取消",
  danger = false,
  loading = false,
}: AlertDialogProps): JSX.Element | null {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={!loading}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md",
              "text-gray-700 dark:text-gray-300",
              "bg-white dark:bg-gray-800",
              "border border-gray-300 dark:border-gray-600",
              "hover:bg-gray-50 dark:hover:bg-gray-700",
              "focus:outline-none focus:ring-2 focus:ring-primary-500",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md text-white",
              danger
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-500",
              "focus:outline-none focus:ring-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              loading && "relative",
            )}
          >
            {loading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            )}
            <span className={loading ? "invisible" : ""}>{confirmText}</span>
          </button>
        </>
      }
    />
  );
}

export default Dialog;
