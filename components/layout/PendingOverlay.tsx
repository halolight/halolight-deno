/**
 * PendingOverlay 加载遮罩组件
 * 全屏或区域加载状态显示
 */
import type { ComponentChildren } from "preact";
import { cn } from "../../lib/utils.ts";

interface PendingOverlayProps {
  /** 是否显示 */
  pending?: boolean;
  /** 加载文本 */
  text?: string;
  /** 是否全屏 */
  fullscreen?: boolean;
  /** 背景模糊 */
  blur?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children?: ComponentChildren;
  /** 加载器类型 */
  variant?: "spinner" | "dots" | "bars" | "pulse";
  /** 加载器大小 */
  size?: "sm" | "md" | "lg";
}

export function PendingOverlay({
  pending = false,
  text = "加载中...",
  fullscreen = false,
  blur = true,
  className,
  children,
  variant = "spinner",
  size = "md",
}: PendingOverlayProps) {
  if (!pending) return <>{children}</>;

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-blue-500",
                  size === "sm"
                    ? "h-2 w-2"
                    : size === "md"
                    ? "h-3 w-3"
                    : "h-4 w-4",
                  "animate-bounce",
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );
      case "bars":
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "bg-blue-500 rounded",
                  size === "sm"
                    ? "w-1 h-4"
                    : size === "md"
                    ? "w-1.5 h-6"
                    : "w-2 h-8",
                  "animate-pulse",
                )}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "0.8s",
                }}
              />
            ))}
          </div>
        );
      case "pulse":
        return (
          <div className="relative">
            <div
              className={cn(
                sizeClasses[size],
                "rounded-full bg-blue-500/30 animate-ping absolute",
              )}
            />
            <div
              className={cn(
                sizeClasses[size],
                "rounded-full bg-blue-500",
              )}
            />
          </div>
        );
      default: // spinner
        return (
          <svg
            className={cn(sizeClasses[size], "animate-spin text-blue-500")}
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
        );
    }
  };

  const overlay = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullscreen ? "fixed inset-0 z-50" : "absolute inset-0 z-10",
        blur
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          : "bg-white/95 dark:bg-gray-900/95",
        "transition-opacity duration-200",
        className,
      )}
    >
      {renderLoader()}
      {text && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <>
        {children}
        {overlay}
      </>
    );
  }

  return (
    <div className="relative">
      {children}
      {overlay}
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner(
  { size = "md", className }: LoadingSpinnerProps,
) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <svg
      className={cn(sizeClasses[size], "animate-spin text-blue-500", className)}
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
  );
}

interface LoadingDotsProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingDots({ size = "md", className }: LoadingDotsProps) {
  const dotSize = size === "sm"
    ? "h-1.5 w-1.5"
    : size === "md"
    ? "h-2 w-2"
    : "h-3 w-3";

  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(dotSize, "rounded-full bg-current animate-bounce")}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export default PendingOverlay;
