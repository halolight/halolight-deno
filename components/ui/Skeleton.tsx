/**
 * Skeleton 组件
 * 骨架屏加载组件
 */

import type { JSX } from "preact";
import { cn } from "../../lib/utils.ts";

// ============================================================================
// 类型定义
// ============================================================================

export interface SkeletonProps {
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 形状 */
  variant?: "text" | "rectangular" | "circular";
  /** 是否播放动画 */
  animation?: boolean;
  /** 自定义类名 */
  className?: string;
}

// ============================================================================
// 组件
// ============================================================================

/**
 * Skeleton 骨架屏组件
 */
export function Skeleton({
  width,
  height,
  variant = "text",
  animation = true,
  className,
}: SkeletonProps): JSX.Element {
  const style: Record<string, string | number> = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded",
        variant === "text" && "rounded h-4",
        animation && "animate-pulse",
        className,
      )}
      style={style}
    />
  );
}

// ============================================================================
// 预设骨架屏组件
// ============================================================================

/**
 * SkeletonText 文本骨架屏
 */
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? "60%" : "100%"}
          className="h-4"
        />
      ))}
    </div>
  );
}

/**
 * SkeletonAvatar 头像骨架屏
 */
export function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}): JSX.Element {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  return (
    <Skeleton
      variant="circular"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
    />
  );
}

/**
 * SkeletonCard 卡片骨架屏
 */
export function SkeletonCard({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="space-y-2 flex-1">
          <Skeleton width="40%" className="h-4" />
          <Skeleton width="20%" className="h-3" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}

/**
 * SkeletonTable 表格骨架屏
 */
export function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("w-full", className)}>
      {/* 表头 */}
      <div className="flex gap-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} width={`${100 / columns}%`} className="h-4" />
        ))}
      </div>
      {/* 表体 */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 py-3">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                width={`${100 / columns}%`}
                className="h-4"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * SkeletonList 列表骨架屏
 */
export function SkeletonList({
  count = 5,
  showAvatar = true,
  className,
}: {
  count?: number;
  showAvatar?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          {showAvatar && <SkeletonAvatar size="sm" />}
          <div className="space-y-2 flex-1">
            <Skeleton width="60%" className="h-4" />
            <Skeleton width="40%" className="h-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
